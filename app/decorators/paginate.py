import functools
from flask import url_for, request


def paginate(collection, max_per_page=25):
    def decorator(f):
        @functools.wraps(f)
        def wrapped(*args, **kwargs):
            query = f(*args, **kwargs)

            page = request.args.get('Page', 1, type=int)
            per_page = min(request.args.get('Per_page', max_per_page,
                                            type=int), max_per_page)

            p = query.paginate(page, per_page)

            pages = {'Page': page, 'Per_page': per_page,
                     'Total': p.total, 'Pages': p.pages}
            if p.has_prev:
                pages['Prev_url'] = url_for(request.endpoint, page=p.prev_num,
                                            per_page=per_page,
                                            _external=True,
                                            **kwargs)
            else:
                pages['Prev_url'] = None
            if p.has_next:
                pages['Next_url'] = url_for(request.endpoint, page=p.next_num,
                                            per_page=per_page, _external=True,
                                            **kwargs)
            else:
                pages['Next_url'] = None
            pages['First_url'] = url_for(request.endpoint, page=1,
                                         per_page=per_page,
                                         _external=True, **kwargs)
            pages['Last_url'] = url_for(request.endpoint, page=p.pages,
                                        per_page=per_page,
                                        _external=True, **kwargs)
            results = [item.export_data() for item in p.items]
            return {collection: results, 'Pages': pages}
        return wrapped
    return decorator
