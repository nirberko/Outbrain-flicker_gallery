import Component     from "../../vDOM/Component";
import createElement from "../../vDOM/createElement";
import request       from '../../common/request';

import Thumbnail     from '../Thumbnail';
import Breadcrumb    from '../Breadcrumb';

import './index.scss';

const Thumbnails = new Component({
    thumbnails: [],
    Thumbnail: []
});

const Loader = createElement('div', {
    attrs: {
        class: "Thumbnails__loader"
    }
});

const fetchThumbnails = (userId) => {
    let url = `https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=animales${userId ? `&id=${userId}` : ''}`;

    request(url).then(res => {
        Thumbnails.setState({
            userId,
            thumbnails: res.items
        });
    });
};

const fetchThumbnailsWithQueryParam = () => {
    const urlParams = new URLSearchParams(window.location.search);
    fetchThumbnails(urlParams.get('user_id'));
};

fetchThumbnailsWithQueryParam();

window.onpopstate = () => fetchThumbnailsWithQueryParam();

Thumbnails.render(({thumbnails, userId}) => {
    let children =  [
        Loader
    ];

    let columns = [[],[],[],[]];

    const onSelectAuthor = (author_id) => {
        history.pushState({}, null, `?user_id=${author_id}`);
        fetchThumbnails(author_id)
    };

    let i = 0;
    thumbnails.forEach(item => {
        columns[i].push(Thumbnail(item, onSelectAuthor).render());

        i === 3 ? i = 0 : i++
    });

    if (thumbnails.length) {
        children = columns.map(column => (
            createElement('li', {
                children: column
            })
        ))
    }

    return (
        createElement('main', {
            attrs: {
                id: 'app',
                class: 'Main'
            },
            children: [
                Breadcrumb(userId, onSelectAuthor),
                createElement('div', {
                    attrs: {
                        class: 'Thumbnails',
                    },
                    children: [
                        createElement('ul', {
                            attrs: {
                                class: 'Thumbnails__list'
                            },
                            children
                        })
                    ]
                })
            ]
        })
    )
});

export default Thumbnails;