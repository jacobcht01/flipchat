import React from 'react'

const FreeModal = ({ body, handleCancel, handleSubmit, submitText="Submit" }) => {
    return (
        <div className="modal">
            <div className="modal-container">
                <div className="modal-body">
                    {body}
                    <div className='modal-btns'>
                        <button className='btn-secondary' onClick={handleCancel}>Cancel</button>
                        {/* Put a loader here */}
                        {<button className='btn-primary' onClick={handleSubmit}>{submitText}</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FreeModal