import { IoClose } from 'react-icons/io5'

const Modal = ({activeModal, title, buttonClose, width, content}) => {

    return (
        <div className={`${activeModal ? 'translate-y-0' : '-translate-y-[2000px]'} transition-all duration-1000 ease-in-out fixed left-0 top-0 z-50`}>
            <div className='h-screen w-screen bg-black  bg-opacity-40 overflow-hidden flex items-center justify-center p-10'>
                <div className={`max-h-[700px] overflow-auto shadow-lg bg-white rounded-xl scrollbar-hide`} style={{ width: width }}>
                    <div className='flex items-center justify-between bg-[#F6F8F8] py-[7px] px-[24px] border-b'>
                        <h1 className='text-[16px] font-[600] text-[#11181C] pt-1'>{title}</h1>
                        <button onClick={buttonClose}>
                            <IoClose className='text-2xl text-[#667680]'/>
                        </button>
                    </div>
                    <div className='mt-6'>
                        {content}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal