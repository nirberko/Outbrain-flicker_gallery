export default (tagName, {attrs = {}, events = {}, children = []}) => {
    return {
        tagName,
        attrs,
        events,
        children,
    };
};