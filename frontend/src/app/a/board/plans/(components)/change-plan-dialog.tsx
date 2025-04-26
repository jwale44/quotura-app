import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PlansPricingSection } from "./plans-pricing-section"

interface ChangePlanDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export const ChangePlanDialog = ({ open, setOpen }: ChangePlanDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="!max-w-5xl w-full h-[80vh] !overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="font-sans">Change Plan</DialogTitle>
          <DialogDescription className="font-sans text-xs">
            Update your current plan
          </DialogDescription>
        </DialogHeader>

        <div className="relative flex flex-col items-center justify-center">
          <PlansPricingSection />
        </div>
      </DialogContent>
    </Dialog>
  )
}
