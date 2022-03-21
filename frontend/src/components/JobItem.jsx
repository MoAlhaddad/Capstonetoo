import {useDispatch} from 'react-redux'
import {deleteJob} from '../features/jobs/jobSlice'

function JobItem({job}) {

    const dispatch = useDispatch()
  return (
    <div className="job">
        <div>
            {new Date(job.createdAt).toLocaleString('en-US')}
        </div>
        <h2>{job.text}</h2>
        <button onClick={() => dispatch(deleteJob(job._id))} className="close">X</button>
        </div>
  )
}

export default JobItem