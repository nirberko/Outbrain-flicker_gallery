import vRender from './render'

function Component(state = {}){
    let renderedNode;
    let localNode;
    let localState = state;

    const render = node => {
        // only if comes from setState
        if (node) {
            renderedNode = vRender(node(localState)); // assign dom element with the new state
            localNode = node; // saving the updated node with the state changes inside
            return renderedNode;  // returns the dom element
        }

        return localNode();// when rendering from component and not with setState
    };

    const setState = (newState) => {
        localState = newState;
        renderedNode.replaceWith(render(localNode))
    };

    return {
        setState,
        render,
        getNode: () => renderedNode // returns the element for init() function
    }
}

export default Component;