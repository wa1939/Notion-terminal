"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]

export default function BookingCalendar() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [booked, setBooked] = useState(false)

  const handleBooking = () => {
    if (!date || !selectedTime) return

    // Here you would typically send the booking to your backend
    console.log("Booking:", { date, time: selectedTime })

    // Show success message
    setBooked(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setDate(undefined)
      setSelectedTime(null)
      setBooked(false)
    }, 3000)
  }

  // Disable weekends and past dates
  const disabledDays = (date: Date) => {
    const day = date.getDay()
    return (
      day === 0 || // Sunday
      day === 6 || // Saturday
      date < new Date(new Date().setHours(0, 0, 0, 0)) // Past dates
    )
  }

  return (
    <div className="space-y-4">
      {!booked ? (
        <>
          <div className="border-2 border-violet-700 p-2 bg-indigo-950">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={disabledDays}
              className="rounded-none text-violet-200"
            />
          </div>

          {date && (
            <div className="space-y-4">
              <h3 className="font-bold text-violet-300">Select a time:</h3>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "py-2 px-4 border-2 border-violet-700 text-center",
                      selectedTime === time
                        ? "bg-violet-700 text-white"
                        : "bg-indigo-900 hover:bg-indigo-800 text-violet-200",
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>

              <Button
                onClick={handleBooking}
                disabled={!selectedTime}
                className="w-full bg-violet-700 hover:bg-violet-800 text-white border-2 border-violet-900 rounded-none disabled:opacity-50"
              >
                Book Appointment
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8 border-2 border-dashed border-violet-700 bg-indigo-900">
          <h3 className="text-xl font-bold mb-2 text-violet-300 animate-glow">Booking Confirmed!</h3>
          <p className="text-violet-200">
            Your appointment on{" "}
            <span className="font-bold">
              {date?.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}{" "}
              at {selectedTime}
            </span>{" "}
            has been scheduled.
          </p>
        </div>
      )}
    </div>
  )
}

