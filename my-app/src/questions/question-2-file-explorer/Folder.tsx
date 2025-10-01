
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


function Folder({ explorer, handleInsertNode }) {

    const [expand, setExpand] = useState(false)
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: null
    })

    const handleNewFolder = (e, isFolder) => {
        e.stopPropagation()
        setExpand(true)
        setShowInput({
            visible: true,
            isFolder: isFolder
        })
    }

    const onAddFolder = (e) => {
        if (e.key === 'Enter' && e.target.value) {

            handleInsertNode({ folderId: explorer.id, item: e.target.value, isFolder: showInput.isFolder })
            setShowInput({ ...showInput, visible: false })
        }
    }

    if (explorer.isFolder) {
        return (
            <div style={{ marginTop: 5 }}>
                <div className='mt-1.5 bg-gray-400 flex justify-between p-1 w-[300px] cursor-pointer' onClick={() => setExpand((prev) => !prev)} >
                    <span>
                        <FontAwesomeIcon icon={faFolder} style={{ color: 'gold' }} />
                        {explorer.name}
                    </span>
                    <div className='flex gap-1'>
                        <button className='text-sm bg-white p-1 rounded-lg cursor-pointer' onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
                        <button className='text-sm bg-white p-1 rounded-lg cursor-pointer' onClick={(e) => handleNewFolder(e, false)}>File +</button>
                    </div>
                </div>
                <div style={{ display: expand ? 'block' : 'none' }} className='pl-5'>

                    {
                        showInput.visible ? (
                            <div className='flex align-items-center gap-1'>
                                <span>
                                    {
                                        showInput.isFolder ?
                                            <FontAwesomeIcon icon={faFolder} style={{ color: 'gold' }} /> :
                                            '📄'
                                    }
                                </span>
                                <input
                                    className='mt-1 p-1 flex border-1 border-gray-500'
                                    type='text'
                                    placeholder='type name'
                                    onBlur={() => setShowInput({ ...showInput, visible: false })}
                                    autoFocus
                                    onKeyDown={(e) => onAddFolder(e)}
                                />
                            </div>
                        )

                            : ''
                    }

                    {explorer.items.map((exp) => (
                        <Folder key={exp.id} explorer={exp} handleInsertNode={handleInsertNode} />
                    ))}
                </div>
            </div >
        )
    } else {
        return (
            < span className='mt-1.5 pl-1.5 flex flex-col'>
                📄 {explorer.name}
            </span >
        )
    }
}

export default Folder
