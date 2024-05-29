export default function ProfilePage({params}:any){
    return (
        <>
        <div className="text-[1.3rem] mt-[15rem] text-white text-center">Profile Page</div>
        <div className="text-[1.3rem] text-white text-center">Profile:{params.id}</div>
        </>
    )
}