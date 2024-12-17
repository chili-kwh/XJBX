import React, {useLayoutEffect} from "react";

function Effect() {
    useLayoutEffect(() => {
        console.log('useLayoutEffect')
        // while(1){
        //     // TODO test 阻塞
        //     // console.log('useLayoutEffect')
        // }
    })

    return <div>Effect</div>
}

export default Effect;