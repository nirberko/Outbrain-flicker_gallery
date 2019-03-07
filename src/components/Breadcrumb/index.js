import createElement from "../../vDOM/createElement";

import './index.scss';

export default (userId, onSelectAuthor) => {
    const breadCrumb = (label, onClick) => (
        createElement('li', {
            events: {
                onclick: (e) => {
                    e.stopPropagation();
                    onClick()
                }
            },
            children: [label]
        })
    );

    const main = breadCrumb('Thumbnails', () => {
        if (userId) {
            history.back()
        }
    });


    let children = [
        main,
        userId ? breadCrumb(userId, () => {
            onSelectAuthor(userId)
        }) : ''
    ];

    return (
        createElement('ul', {
            attrs: {
                class: 'Breadcrumb'
            },
            children
        })
    )
}