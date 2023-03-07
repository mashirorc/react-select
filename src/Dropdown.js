import { useState } from 'react'
import './Dropdown.css'

function Dropdown(){

    const options = [
    {value: 'red', label: 'Red'},
    {value: 'green', label: 'Green'},
    {value: 'blue', label: 'Blue'},
    {value: 'yellow', label: 'Yellow'},
    {value: 'white', label: 'White'},
    {value: 'black', label: 'Black'},
    {value: 'cyan', label: 'Cyan'},
    {value: 'purple', label: 'Purple'},    
    ]

    const [showDropdown, setShowDropdown] = useState(false)
    const [selectedArr, setSelectedArr] = useState([])
    const [searchText, setSearchText] = useState('')

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setShowDropdown(!showDropdown)
    }

    const handleChange = (e) => {
        e.stopPropagation();
        setShowDropdown(true)
        setSearchText(e.target.value)
    }

    const getOptions = () => {
        if ( searchText === ''){
            return options
        } else {
            return options.filter((option) => option.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0);
        };
    }

    const removeSelected = (e, label) => {
        e.stopPropagation()
        setSelectedArr(selectedArr.filter( option => option.label !== label))
    }

    const addToSelected = (value) => {
        if (!selectedArr.some(option => option.value === value)){
            setSelectedArr([...selectedArr, options.filter(option => option.value === value)[0]])
        }
        setShowDropdown(false)
        setSearchText('')
    }

    const removeAllSelected = (e) => {
        e.stopPropagation()
        setSelectedArr([])
    }

    return (
    <div className="dropdown-container">
        <div className="dropdown-input">
            <div className="dropdown-selected-value">
                <div className='dropdown-tags'>
                    {selectedArr.map((option) => {
                        return <div key={option.value} className="dropdown-tag-item">
                            {option.label}
                            <span onClick={(e) => removeSelected(e, option.label)}>
                                <svg height="20" width="20" viewBox="0 0 20 20">
                                    <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                                </svg>
                            </span>
                        </div>
                    })}
                </div>
            </div>
            <input className = 'search-input' value={searchText} onFocus={()=>setShowDropdown(true)} onBlur={()=>setShowDropdown(false)} onChange={handleChange}></input>
            <div className="dropdown-tools">
                <svg height="20" width="20" viewBox="0 0 20 20" onClick={removeAllSelected}>
                    <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                </svg>
                <svg height="20" width="20" viewBox="0 0 20 20" onClick={toggleDropdown}>
                    <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                </svg>
            </div>
        </div>
        {showDropdown ? <div className='dropdown-menu'>
            {getOptions().length === 0 ? 
                <div key={'no-options'} className="dropdown-item-no-options">
                        No options
                    </div> : getOptions().map((option) => {
                if(selectedArr.some(selected => selected.value === option.value)){
                    return <div key={option.value} className="dropdown-item-selected" onClick={() => addToSelected(option.value)}>
                        {option.label}
                    </div>
                } else {
                    return <div key={option.value} className="dropdown-item" onClick={() => addToSelected(option.value)}>
                        {option.label}
                    </div>
                }
                
            })}
        </div>:null}
    </div>
    )
}

export default Dropdown;