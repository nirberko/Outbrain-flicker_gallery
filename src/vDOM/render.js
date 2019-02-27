const renderElem = ({tagName, attrs, children}) => {
    const element = document.createElement(tagName);

    Object.keys(attrs).forEach(key => {
        element.setAttribute(key, attrs[key]);
    });

    children.forEach(child => {
        const renderedChild = render(child);
        element.appendChild(renderedChild);
        if (child.events) {
            Object.keys(child.events).forEach(eventName => {
                renderedChild[eventName] = child.events[eventName]
            })
        }
    });

    return element;
};

const render = (node) => {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }

    return renderElem(node);
};

export default render;
