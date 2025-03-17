import React from 'react'

const CommonModal = ({ header, para, handleCancel, handleSubmit, isLoading=false, submitText="Submit" }) => {
    return (
        <div className="modal">
            <div className="modal-container">
                <div className="modal-body">
                    <h3 className="modal-title">{header}</h3>
                    {para && <p className='modal-para'>{para}</p>}
                    <div className='modal-btns'>
                        <button className='btn-secondary' onClick={handleCancel}>Cancel</button>
                        {/* Put a loader here */}
                        <button className='btn-primary' onClick={handleSubmit}>{submitText}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommonModal