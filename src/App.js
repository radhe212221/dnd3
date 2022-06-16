import axios from 'axios'
import React, { useState } from 'react'
const url = `https://fbprj2-c394f-default-rtdb.firebaseio.com/form.json`
export default function App() {
    const [state, setState] = useState({
        gender: "male",
        skills: [],
        degree: '',
        board: '',
        image: '',
        age: 0,
    })
    const handleSubmit = () => {
        axios.post(url, state)
            .then(res => console.log(res.data))
            .catch(err => console.log(`err: ${err}`))
    }
    const handleChange = e => {
        let { name, value } = e.target
        if (name === "gender" || name === "degree" || name === "board" || name === "age") {
            setState({ ...state, [name]: value })
        }

        if (name === "skills") {
            if (state?.skills.some(x => x === value)) {
                // remove
                setState({ ...state, skills: state.skills.filter(x => x !== value) })
            }
            else {
                // add
                setState({ ...state, skills: [...state.skills, value] })
            }
        }

        if (name === "image") {
            let file = e.target.files[0]
            let fr = new FileReader()
            fr.onload = () => setState({ ...state, image: fr.result })
            if (file) {
                return fr.readAsDataURL(file)
            }
        }

    }

    const checkinstate = val => {
        return state?.skills?.some(x => x === val)
    }
    return (
        <div>
            <h1>form</h1>
            <code>
                {/* {JSON.stringify(state)} */}
            </code>
            <p>select gender</p>
            <input checked={state?.gender === 'male'} onChange={handleChange} type="radio" name='gender' value="male" />
            <input checked={state?.gender === 'female'} onChange={handleChange} type="radio" name='gender' value="female" />


            <p>skills</p>
            <input onChange={handleChange} checked={checkinstate('html')} value="html" type="checkbox" name='skills' />

            <input onChange={handleChange} checked={checkinstate('css')} value="css" type="checkbox" name='skills' />
            <input onChange={handleChange} checked={checkinstate('js')} value="js" type="checkbox" name='skills' />


            <p>select degree</p>
            <select name='degree' onChange={handleChange} value={state?.degree}>
                <option value="" disabled defaultChecked={true}>select a degree</option>
                <option value="bca">bca</option>
                <option value="mca">mca</option>
                <option value="bcom">bcom</option>
                <option value="mcom">mcom</option>
            </select>
            <p>select board</p>
            <input value={state?.board} onChange={handleChange} name='board' list='boardlist' />
            <datalist id='boardlist'>
                <option value="cbse">cbse</option>
                <option value="hbsc">hbsc</option>
                <option value="bseb">bseb</option>
            </datalist>
            <p>select image</p>
            <input accept='image/png,image/jpeg' type="file" name='image' onChange={handleChange} />
            <br />
            {state?.image && <img width={100} src={state?.image} />}
            <p>select age</p>
            <input name='age' type="range" min="15" max={50} value={state?.age} onChange={handleChange} />
            <mark>{state?.age}</mark>
            <p>click to submit</p>
            <button onClick={handleSubmit}>submit</button>
        </div>
    )
}
