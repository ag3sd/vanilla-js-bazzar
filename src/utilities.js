const loop=(arr=[], func)=> {
    let template='';

    arr.forEach((ele, i)=> {
            template +=func(ele, i);
        }

    );
    return template;
}

const showIf=(boole, func)=> {
    let template='';

    if (boole) {
        template+=functionCheck(func)
    }

    return template;
}

const showIfElse=(boole, func1, func2)=> {
    let template='';

    if (boole) {
        template+=functionCheck(func1);
    }

    else {
        template+=functionCheck(func2);
    }

    return template;
}

const functionCheck=(func)=>(func instanceof Function) ? func() : func;

export {
    loop,
    showIf,
    showIfElse
}

;