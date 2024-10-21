import Table from 'react-bootstrap/Table';
import Select from 'react-select';
import { useState } from 'react';
import './ManageQuiz.scss';
import { postCreateNewQuiz } from '../../../../Services/apiService';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
const options = [
    { value: 'EASY', label: 'Easy' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'HARD', label: 'Hard' },
]
const ManageQuiz = (props) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [image, setImage] = useState(null)

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }

    const handleSubmitNewQuiz = async () => {
        if (!name || !description) {
            toast.error('Name/Description is required')
            return
        }
        let data = await postCreateNewQuiz(description, name, type?.value, image);
        console.log('>>>Check Data Submit: ', data)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            setName('')
            setDescription('')
            setType('')
            setImage(null)
        } else { toast.error(data.EM) }

    }
    return (
        <div className="manage-quiz">
            <div className="title"> ManageQuiz</div>
            <div className="add-new-quiz">
                <fieldset className='border rounded-3 p-3'>
                    <legend className='float-none w-auto px-3'>Add New</legend>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Name'
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <label >Name</label>

                    </div>
                    <div className="form-floating">
                        <input
                            type="type"
                            className="form-control"
                            placeholder='Description'
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                        <label >Description</label>
                    </div>
                    <div className="my-3">
                        <Select
                            placeholder={'Type quiz...'}
                            options={options}
                            onChange={setType}
                        />
                    </div>
                    <div className="more-actions form-group">
                        <div className='my-1'>Upload Image</div>
                        <input
                            type='file'
                            className="form-control"
                            onChange={(event) => handleChangeFile(event)}
                        />
                    </div>
                    <div className='mt-4'>
                        <button
                            className='btn btn-warning'
                            onClick={() => handleSubmitNewQuiz()}

                        >
                            Save</button>
                    </div>
                </fieldset>


            </div>
            <div className="list-quiz">
                <TableQuiz />
            </div>
        </div>
    )
}
export default ManageQuiz