import Component     from "../../vDOM/Component";
import createElement from "../../vDOM/createElement";
import dayjs         from "dayjs";

export default (item, onSelectAuthor) => {
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
                            onSelectAuthor(item.author_id)
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
        createElement('div', {
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

    return ThumbnailCard;
};