import React from 'react';

const Nav = (props) => {
    /* Fonction  */
    function getBtnClass(selected){
        /* Opérateur ternaire (équivaut à if..then..else) */
        
        return selected ? "btn-warning" : "btn-secondary";
        
        // if(selected) return "btn-warning";
        // else return "btn-secondary"; {/*onClick={()=>{props.onClick(index)}}*/}
    }


    return (
        <nav>
            <ul className="list-unstyled d-flex justify-content-center">
                {props.terms.map((term, index) =>(
                    <li 
                    id={term.id}
                    onClick={ (event) => {
                    props.onClickTerm(event, term.id);
                  }}
                    key={term.id} 
                    className={`btn ${getBtnClass(term.selected)} m-2 p-2`}
                    >{term.name}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Nav;