import * as React from 'react'
import { ITaskContent } from '../../types/data'

const TaskContent: React.FunctionComponent<ITaskContent> = ({ title, small, color, children }) => {
    return (
        <div className={`${small}`}>
            {title && <div>
                <strong className={`text-${color}`}>{title}</strong>
            </div>}
            <div>{children}</div>
        </div>
    )
}
export default React.memo(TaskContent)