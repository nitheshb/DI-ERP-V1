import { useState, useContext } from 'react'

import { DocumentTextIcon, TrashIcon } from '@heroicons/react/outline'
import { doc, deleteDoc } from 'firebase/firestore'

const DowRow = ({ id, fileName, date }) => {
  const [showModel, setShoModel] = useState(false)
  const toggle = () => setShoModel(!showModel)
  // const { user } = useContext(AuthContext)
  const deleteDocument = async (id) => {
    // console.log(id);
    // try {
    //   const docRef = doc(firestore, 'userDocs', `${user?.uid}`, 'docs', id)
    //   console.log(docRef)
    //   if (docRef) {
    //     deleteDoc(docRef)
    //     setShoModel(false)
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  }
  return (
    <>
      <div className="flex max-w-3xl mx-auto items-center p-4 rounded-lg hover:bg-gray-300 cursor-pointer text-gray-700 text-sm">
        {/* <Icon name="article" size="3xl" color="blue" /> */}
        <DocumentTextIcon className="w-4 h-4 text-blue-500" />
        {/* <Link to={`/doc/${id}`} className="flex items-center w-full"> */}
        <p className="flex-grow pl-5 pr-10">{fileName}</p>
        {/* <p className="pr-5 text-sm truncate">{`${date
            ?.toDate()
            ?.toDateString("en-US")} at ${date
            ?.toDate()
            ?.toLocaleTimeString("en-US")}`}</p> */}
        <p className="pr-5 text-xs truncate">{date}</p>
        {/* </Link> */}
        <button
          color="gray"
          className="border-0 block rounded"
          onClick={() => setShoModel(true)}
        >
          <TrashIcon name="delete" className="w-4 h-4" />
        </button>
      </div>
      {/* <Modal size="sm" active={showModel} toggler={toggle}>
        <ModalBody>Do you really want to delete this document?</ModalBody>
        <ModalFooter>
          <Button
            color="red"
            onClick={() => deleteDocument(id)}
            ripple="dark"
            type="submit"
          >
            Yes
          </Button>
          <Button
            color="blue"
            buttonType="link"
            onClick={() => setShoModel(false)}
            ripple="dark"
          >
            No
          </Button>
        </ModalFooter>
      </Modal> */}
    </>
  )
}

export default DowRow
