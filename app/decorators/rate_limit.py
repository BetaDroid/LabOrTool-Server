import functools
from time import time
from flask import current_app, request, g, jsonify

_limiter = None


class MemRateLimit(object):
    def __init__(self):
        self.counters = {}

    def is_allowed(self, key, limit, period):
        now = int(time())
        begin_period = now // period * period
        end_period = begin_period + period

        self.cleanup(now)
        if key in self.counters:
            self.counters[key]['Hits'] += 1
        else:
            self.counters[key] = {'Hits': 1, 'Reset': end_period}
        allow = True
        remaning = limit - self.counters[key]['Hits']
        if remaning < 0:
            remaning = 0
            allow = False
        return allow, remaning, self.counters[key]['Reset']

    def cleanup(self, now):
        for key, value in list(self.counters.items()):
            if value['Reset'] < now:
                del self.counters[key]


def rate_limit(limit, period):
    def decorator(f):
        @functools.wraps(f)
        def wrapped(*args, **kwargs):
            if current_app.config['TESTING']:
                return f(*args, **kwargs)
            else:
                global _limiter
                if _limiter is None:
                    _limiter = MemRateLimit()

                key = '{0}/{1}'.format(f.__name__, request.remote_addr)
                allowed, remaning, reset = _limiter.is_allowed(key, limit, period)

                g.headers = {
                    'X-RateLimit-Remaining': str(remaning),
                    'X-RateLimit-Limit' : str(limit),
                    'X-RateLimit-Reset' : str(reset)
                }

                if not allowed:
                    response = jsonify(
                        {'Status': 429, 'Error': 'Too Many Requests',
                         'Message': 'You have exceeded your request rate'})
                    response.status_code = 429
                    return response
                return f(*args, **kwargs)
        return wrapped
    return decorator
