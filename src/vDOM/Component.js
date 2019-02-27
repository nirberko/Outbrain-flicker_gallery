import vRender from './render'

function Component(state = {}){
    let renderedNode;
    let localNode;
    let localState = state;

    const render = node => {
        if (node) {
            renderedNode = vRender(node(localState));
            localNode = node;
            return renderedNode;
        }

        return localNode();
    };

    const setState = (newState) => {
        localState = newState;
        renderedNode.replaceWith(render(localNode))
    };

    return {
        setState,
        render,
        getNode: () => renderedNode
    }
}

export default Component;