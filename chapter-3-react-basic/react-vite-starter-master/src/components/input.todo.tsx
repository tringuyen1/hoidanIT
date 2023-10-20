
export interface IProps {
    name?: string,
    age?: number,
    info?: {
        gender?: string,
        address?: string
    }
}

const InputTodo = (props: IProps) => {
    const { age } = props
    return (
        <>
            <div>{age}</div>
        </>
    )
}

export default InputTodo;