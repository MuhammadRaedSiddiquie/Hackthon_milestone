import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  // DialogFooter,
  // DialogHeader,
  // DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useUser } from "@auth0/nextjs-auth0/client";



function Dialogdemo() {
  const { user} = useUser();
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline" className="border-0 px-0 montserrat-bold text-[#23A6F0] text-sm hover:bg-background hover:text-blueHov xxl:text-xl">Login / Signup</Button> */}
  

          <p className='montserrat-bold text-[#23A6F0] text-sm hover:text-blueHov xxl:text-xl'>{user?.name}</p>
            
        
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="montserrat-bold text-primaryCol text-2xl">Log Out</h1>
          <p className="montserrat-regular text-[#23A6F0] text-sm">Are you sure you want to Logout?</p>
          <a href="/api/auth/logout"><Button type="button" className="montserrat-bold">Logout</Button></a>
          
        </div>
        
      </DialogContent>
    </Dialog>
    
  )
}
export default Dialogdemo;
