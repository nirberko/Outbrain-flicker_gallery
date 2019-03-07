const renderElem = ({tagName, attrs, events, children}) => {
    const element = document.createElement(tagName);

    Object.keys(attrs).forEach(key => {
        element.setAttribute(key, attrs[key]);
    });

    Object.keys(events).forEach(eventName => {
        element[eventName] = events[eventName]
    });

    children.forEach(child => {
        const renderedChild = render(child);
        element.appendChild(renderedChild);
    });

    return element;
};

const render = (node) => {
    if (typeof node === 'string') {
        return document.createTextNode(node); // creates simple test node if the children is just text
    }

    return renderElem(node);
};

export default render;
