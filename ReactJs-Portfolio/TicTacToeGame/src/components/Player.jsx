import { useState } from "react";

export default function Player({initName, symbol, isActive}){
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(initName);

    function handleIsEditing() {
        setIsEditing((editing) => !editing);
    }

    function handleChange(nameInput){
        setName(nameInput.target.value);
    }

    let playerName = <span className="player-name">{name}</span>;

    if(isEditing){
        playerName = (
            <input 
                type="text" 
                required 
                value={name} 
                onChange={handleChange} 
            />);
    };

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleIsEditing}>{isEditing ? 'Save' : 'Edit'}</button>
        </li> 
    );
};