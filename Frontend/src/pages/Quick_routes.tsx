import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { MapPin, Search, Bus, Train, Plane, Car, Leaf, CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from "@/lib/utils"

// Placeholder data for routes
type TransportMode = 'bus' | 'train' | 'flight' | 'car';

const routes: { id: number, mode: TransportMode, time: number, distance: string, price: number, eco: boolean }[] = [
  { id: 1, mode: 'bus', time: 150, distance: '150 km', price: 25, eco: true },
  { id: 2, mode: 'train', time: 105, distance: '180 km', price: 40, eco: true },
  { id: 3, mode: 'flight', time: 60, distance: '300 km', price: 120, eco: false },
  { id: 4, mode: 'car', time: 120, distance: '200 km', price: 30, eco: false },
]

const tips = [
  "Travel during off-peak hours to save on costs.",
  "Consider carpooling or public transport for a more eco-friendly journey.",
  "Book in advance to secure better prices on tickets.",
  "Pack light to avoid excess baggage fees on flights.",
]

// Date Picker Component
const DatePicker = ({ date, setDate }: { date: Date | undefined, setDate: (date: Date | undefined) => void }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant={"outline"}
        className={cn(
          "w-full justify-start text-left font-normal",
          !date && "text-muted-foreground"
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? format(date, "PPP") : <span>Pick a date</span>}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        initialFocus
        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
      />
    </PopoverContent>
  </Popover>
)

const QuickRoutesPage = () => {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState<Date>()
  const [filterOption, setFilterOption] = useState("none")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for routes:', { from, to, date })
    // Implement search functionality here
  }

  const getModeIcon = (mode: 'bus' | 'train' | 'flight' | 'car') => {
    const icons: { [key in 'bus' | 'train' | 'flight' | 'car']: JSX.Element } = {
      bus: <Bus className="h-6 w-6" />,
      train: <Train className="h-6 w-6" />,
      flight: <Plane className="h-6 w-6" />,
      car: <Car className="h-6 w-6" />,
    }
    return icons[mode] || null
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const filteredRoutes = useMemo(() => {
    const sortedRoutes = [...routes]
    if (filterOption === "time") {
      sortedRoutes.sort((a, b) => a.time - b.time)
    } else if (filterOption === "money") {
      sortedRoutes.sort((a, b) => a.price - b.price)
    } else if (filterOption === "both") {
      sortedRoutes.sort((a, b) => (a.time * a.price) - (b.time * b.price))
    }
    return sortedRoutes
  }, [filterOption])

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">Quick Routes</h1>
        
        {/* Search Routes Card */}
        <Card className="bg-gray-800 border-blue-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-400">Search Routes</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from" className="block text-sm font-medium text-gray-300">From</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input
                      id="from"
                      type="text"
                      placeholder="Enter start location"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className="pl-10 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to" className="block text-sm font-medium text-gray-300">To</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input
                      id="to"
                      type="text"
                      placeholder="Enter destination"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className="pl-10 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date" className="block text-sm font-medium text-gray-300">Date</Label>
                  <DatePicker date={date} setDate={setDate} />
                </div>
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Search className="mr-2 h-4 w-4" />
                Search Routes
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Quickest Routes Card */}
            <Card className="bg-gray-800 border-blue-700">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-400">Quickest Routes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Filter by:</h3>
                  <RadioGroup defaultValue="none" onValueChange={setFilterOption}>
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="none" id="none" />
                        <Label htmlFor="none">None</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="time" id="time" />
                        <Label htmlFor="time">Time</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="money" id="money" />
                        <Label htmlFor="money">Money</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="both" />
                        <Label htmlFor="both">Time & Money</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-4">
                  {filteredRoutes.map((route) => (
                    <div key={route.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getModeIcon(route.mode)}
                        <div>
                          <p className="font-semibold">{route.mode.charAt(0).toUpperCase() + route.mode.slice(1)}</p>
                          <p className="text-sm text-gray-400">{route.distance}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatTime(route.time)}</p>
                        <p className="text-sm text-gray-400">${route.price}</p>
                      </div>
                      <Button variant="outline" className="ml-4">
                        Book
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="bg-gray-800 border-blue-700">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-400">Map View</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Interactive map will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>

          
          
        </div>
      </div>
    </div>
  )
}

export default QuickRoutesPage
