import Component     from "../../vDOM/Component";
import createElement from "../../vDOM/createElement";
import request       from '../../common/request';
import dayjs         from 'dayjs';

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

const fetchThumbnails = (user_id) => {
    let url = `https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=animales${user_id ? `&id=${user_id}` : ''}`;

    request(url).then(res => {
        Thumbnails.setState({
            thumbnails: res.items
        });
    });
};

const urlParams = new URLSearchParams(window.location.search);
fetchThumbnails(urlParams.get('user_id'));

Thumbnails.render(({thumbnails}) => {
    let children = thumbnails.length ? [] : [
        Loader
    ];

    thumbnails.forEach(item => {
        const ThumbnailCard = new Component();

        const matchAuthor = item.author.match(/\("(.+)"\)/);

        const header = (
            createElement('header', {
                attrs: {
                    class: 'Thumbnails__list__card__details__header'
                },
                children: [
                    createElement('h3', {
                        events: {
                            onclick: () => window.open(item.link, '_blank')
                        },
                        children: [item.title]
                    }),
                    createElement('button', {
                        events: {
                            onclick: (e) => {
                                e.stopPropagation();
                                history.pushState({}, null, `?user_id=${item.author_id}`);
                                fetchThumbnails(item.author_id)
                            }
                        },
                        children: [matchAuthor[1]]
                    })
                ]
            })
        );

        const footer = (
            createElement('footer', {
                attrs: {
                    class: 'Thumbnails__list__card__details__dateTaken'
                },
                children: [
                    dayjs(item.date_taken).format('DD MMMM YYYY')
                ]
            })
        );

        ThumbnailCard.render(() => (
            createElement('li', {
                attrs: {
                    class: 'Thumbnails__list__card'
                },
                children: [
                    createElement('img', {
                        attrs: {
                            src: item.media.m
                        }
                    }),
                    createElement('article', {
                        attrs: {
                            class: 'Thumbnails__list__card__details'
                        },
                        children: [
                            header,
                            footer
                        ]
                    })
                ]
            })
        ));

        children.push(ThumbnailCard.render())
    });

    return (
        createElement('div', {
            attrs: {
                id: 'app',
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
    )
});

export default Thumbnails;