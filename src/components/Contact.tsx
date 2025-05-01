type Props = {
    id: number;
    photo: string;
    name:string;
    telephone: string;
    onEdit: (id: number) => void;
    onExclude: (id: number) => void;
}
const Contact = ({ id, photo, name, telephone, onEdit, onExclude}: Props) => {
    return (
        <div className="flex justify-around items-center pt-4 pb-2 border-zinc-400 border-b w-lg my-2">
            <img className="w-16 h-16 object-cover rounded-full" src={photo} alt="person-photo" />
            <h3 className="font-bold text-xl">{name}</h3>
            <p className="text-lg">{telephone}</p>
            <p onClick={() => onEdit(id)} className="text-blue-500 text-sm cursor-pointer">Edit</p>
            <p onClick={() => onExclude(id)} className="text-red-500 text-sm cursor-pointer">Remove</p>
        </div>
    )
}

export default Contact;