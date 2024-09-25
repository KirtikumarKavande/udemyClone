import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return <div >

    <div className="text-blue-700 text-sm ml-10 mb-4">

    <p >email: yuvrajdhonisachin@gmail.com</p>
    <p >password: Kirtikumar@1</p>
    </div>
    <SignIn />
  </div> ;
}