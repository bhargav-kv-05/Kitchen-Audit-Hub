import { gradeFromScore, statusFromGrade } from './grades'
import type {
  CategoryScores,
  Cuisine,
  Inspection,
  InspectionOutcome,
  InspectionType,
  Restaurant,
  Violation,
  ViolationStatus,
} from './types'

interface Seed {
  id: string
  name: string
  cuisine: Cuisine
  street: string
  locality: string
  distance: number
  image: string
  lat: number
  lng: number
  history: Array<[date: string, type: InspectionType, score: number, violations: number]>
  violations: Array<[title: string, description: string, status: ViolationStatus, date: string]>
  mapPosition: { x: number; y: number }
}

const INSPECTORS = ['R. Sharma', 'A. Reddy', 'K. Iyer', 'S. Khan', 'M. Rao', 'V. Chary']

const seeds: Seed[] = [
  {
    id: 'chutneys-banjara-hills',
    name: 'Chutneys',
    cuisine: 'Indian',
    street: 'Road No. 3',
    locality: 'Banjara Hills',
    distance: 1.1,
    image: '/images/curry-leaf.png',
    lat: 17.4239,
    lng: 78.4482,
    history: [
      ['2026-09-28', 'Routine', 96, 1],
      ['2026-06-15', 'Routine', 94, 2],
      ['2026-02-20', 'Follow-up', 92, 2],
    ],
    violations: [
      ['Condiment Labeling', 'Chutney holding vessels missing prep time stamps.', 'Resolved', '2026-09-28'],
      ['Storage Elevation', 'Ghee containers stored less than 6 inches from ground.', 'Resolved', '2026-06-15'],
    ],
    mapPosition: { x: 38, y: 52 },
  },
  {
    id: 'tatva-jubilee-hills',
    name: 'Tatva Fine Dining',
    cuisine: 'Healthy',
    street: 'Road No. 36',
    locality: 'Jubilee Hills',
    distance: 2.3,
    image: '/images/green-harvest.png',
    lat: 17.4319,
    lng: 78.4073,
    history: [
      ['2026-10-02', 'Routine', 98, 0],
      ['2026-06-20', 'Routine', 97, 1],
      ['2026-03-10', 'Routine', 95, 1],
    ],
    violations: [
      ['Lighting Intensity', 'Storage dry room bulb intensity below 20 foot-candles.', 'Resolved', '2026-06-20'],
    ],
    mapPosition: { x: 42, y: 48 },
  },
  {
    id: 'concu-jubilee-hills',
    name: 'Conçu Patisserie & Cafe',
    cuisine: 'Continental',
    street: 'Road No. 37',
    locality: 'Jubilee Hills',
    distance: 2.5,
    image: '/images/bistro-etoile.png',
    lat: 17.4342,
    lng: 78.4045,
    history: [
      ['2026-10-05', 'Routine', 99, 0],
      ['2026-07-01', 'Routine', 98, 1],
      ['2026-03-14', 'Routine', 97, 1],
    ],
    violations: [
      ['Thermometer Calibration', 'Digital probe required bi-weekly recalibration certificate.', 'Resolved', '2026-07-01'],
    ],
    mapPosition: { x: 45, y: 45 },
  },
  {
    id: 'olive-bistro-jubilee',
    name: 'Olive Bistro & Bar',
    cuisine: 'Italian',
    street: 'Road No. 46, Durgam Cheruvu',
    locality: 'Jubilee Hills',
    distance: 3.2,
    image: '/images/garden-plate.png',
    lat: 17.4389,
    lng: 78.3888,
    history: [
      ['2026-09-22', 'Routine', 97, 1],
      ['2026-05-18', 'Routine', 95, 2],
      ['2026-01-25', 'Routine', 96, 1],
    ],
    violations: [
      ['Dishwashing Sanitizer Log', 'High-temp dish machine log sheet missing midday sign-off.', 'Resolved', '2026-09-22'],
    ],
    mapPosition: { x: 50, y: 42 },
  },
  {
    id: 'rayalaseema-ruchulu-jubilee',
    name: 'Rayalaseema Ruchulu',
    cuisine: 'Indian',
    street: 'Road No. 36',
    locality: 'Jubilee Hills',
    distance: 2.2,
    image: '/images/saffron-kitchen.png',
    lat: 17.4305,
    lng: 78.4091,
    history: [
      ['2026-09-14', 'Routine', 93, 2],
      ['2026-05-28', 'Routine', 90, 3],
      ['2026-02-12', 'Follow-up', 88, 3],
    ],
    violations: [
      ['Spice Container Labeling', 'Secondary spice bins lacked clear Telugu/English labels.', 'Resolved', '2026-09-14'],
      ['Handwashing Station Signage', 'Reminder prompt faded near prep line sink.', 'Resolved', '2026-09-14'],
    ],
    mapPosition: { x: 40, y: 50 },
  },
  {
    id: 'flying-spaghetti-monster-jubilee',
    name: 'Flying Spaghetti Monster',
    cuisine: 'Italian',
    street: 'Road No. 35',
    locality: 'Jubilee Hills',
    distance: 2.4,
    image: '/images/garden-plate.png',
    lat: 17.4331,
    lng: 78.4062,
    history: [
      ['2026-09-19', 'Routine', 94, 1],
      ['2026-06-11', 'Routine', 92, 2],
      ['2026-02-18', 'Routine', 93, 1],
    ],
    violations: [
      ['Pasta Dough Chiller Temp', 'Refrigerated dough drawer was at 42°F; adjusted to 38°F on-site.', 'Resolved', '2026-09-19'],
    ],
    mapPosition: { x: 44, y: 47 },
  },
  {
    id: 'haiku-banjara-hills',
    name: 'Haiku Pan Asian',
    cuisine: 'Asian',
    street: 'Road No. 12',
    locality: 'Banjara Hills',
    distance: 1.4,
    image: '/images/noodle-bistro.png',
    lat: 17.4182,
    lng: 78.4419,
    history: [
      ['2026-09-30', 'Routine', 96, 1],
      ['2026-06-08', 'Routine', 95, 1],
      ['2026-01-20', 'Routine', 94, 2],
    ],
    violations: [
      ['Sushi Rice Acidification Log', 'pH test strip reading omitted for morning batch.', 'Resolved', '2026-09-30'],
    ],
    mapPosition: { x: 36, y: 55 },
  },
  {
    id: 'chubby-cho-jubilee-hills',
    name: 'Chubby Cho',
    cuisine: 'Asian',
    street: 'Road No. 45',
    locality: 'Jubilee Hills',
    distance: 2.8,
    image: '/images/noodle-bistro.png',
    lat: 17.4371,
    lng: 78.4011,
    history: [
      ['2026-09-10', 'Routine', 92, 2],
      ['2026-05-14', 'Routine', 90, 2],
      ['2026-01-28', 'Routine', 89, 3],
    ],
    violations: [
      ['Exhaust Hood Baffles', 'Minor grease accumulation along outer perimeter edge.', 'Resolved', '2026-09-10'],
      ['Non-food Contact Cleanliness', 'Lower shelf of wok prep table required wiping.', 'Resolved', '2026-09-10'],
    ],
    mapPosition: { x: 48, y: 44 },
  },
  {
    id: 'roast-caffeine-capital-hitech',
    name: 'Roast - The Caffeine Capital',
    cuisine: 'Healthy',
    street: 'Hitech City Main Rd',
    locality: 'Hitech City',
    distance: 5.1,
    image: '/images/healthy-table.png',
    lat: 17.4474,
    lng: 78.3762,
    history: [
      ['2026-10-01', 'Routine', 95, 1],
      ['2026-06-25', 'Routine', 93, 2],
      ['2026-02-15', 'Routine', 94, 1],
    ],
    violations: [
      ['Water Filtration Membrane Cert', 'Quarterly reverse-osmosis servicing slip filed late.', 'Resolved', '2026-10-01'],
    ],
    mapPosition: { x: 58, y: 35 },
  },
  {
    id: 'little-italy-hitech',
    name: 'Little Italy',
    cuisine: 'Italian',
    street: 'Cyber Edifice, Hitech City',
    locality: 'Hitech City',
    distance: 4.8,
    image: '/images/garden-plate.png',
    lat: 17.4421,
    lng: 78.3795,
    history: [
      ['2026-09-16', 'Routine', 93, 2],
      ['2026-05-20', 'Routine', 91, 2],
      ['2026-01-18', 'Routine', 92, 1],
    ],
    violations: [
      ['Storage Container Lids', 'Two containers of grated parmesan missing tight-fitting lids.', 'Resolved', '2026-09-16'],
      ['Mop Drying Protocol', 'Mop head left resting in bucket instead of hanging rack.', 'Resolved', '2026-09-16'],
    ],
    mapPosition: { x: 55, y: 38 },
  },
  {
    id: 'zero40-brewing-jubilee',
    name: 'Zero40 Brewing',
    cuisine: 'Continental',
    street: 'Road No. 10',
    locality: 'Jubilee Hills',
    distance: 2.0,
    image: '/images/urban-grill.png',
    lat: 17.4281,
    lng: 78.4125,
    history: [
      ['2026-08-25', 'Routine', 88, 3],
      ['2026-04-19', 'Routine', 86, 3],
      ['2026-01-05', 'Routine', 85, 4],
    ],
    violations: [
      ['Bar Drain Trap Cleanliness', 'Floor drain under craft tap system had minor sediment buildup.', 'Resolved', '2026-08-25'],
      ['Cold Holding Ice Bucket', 'Serving ice scoop rested on machine rim.', 'Resolved', '2026-08-25'],
    ],
    mapPosition: { x: 39, y: 49 },
  },
  {
    id: 'the-hole-in-the-wall-cafe-jubilee',
    name: 'The Hole in the Wall Cafe',
    cuisine: 'Continental',
    street: 'Road No. 39',
    locality: 'Jubilee Hills',
    distance: 2.6,
    image: '/images/fresh-bowl.png',
    lat: 17.4355,
    lng: 78.4033,
    history: [
      ['2026-09-27', 'Routine', 95, 1],
      ['2026-06-12', 'Routine', 94, 1],
      ['2026-02-28', 'Routine', 93, 2],
    ],
    violations: [
      ['Egg Wash Temperature', 'Egg wash prep bowl kept at room temp during morning rush.', 'Resolved', '2026-09-27'],
    ],
    mapPosition: { x: 46, y: 46 },
  },
  {
    id: 'cafe-niloufer-banjara',
    name: 'Cafe Niloufer & Tea Lounge',
    cuisine: 'Indian',
    street: 'Road No. 12',
    locality: 'Banjara Hills',
    distance: 1.5,
    image: '/images/curry-leaf.png',
    lat: 17.4168,
    lng: 78.4445,
    history: [
      ['2026-10-03', 'Routine', 96, 1],
      ['2026-07-05', 'Routine', 95, 1],
      ['2026-03-22', 'Routine', 93, 2],
    ],
    violations: [
      ['Osmania Biscuit Tray Rack', 'Cooling rack wheel caster required cleaning.', 'Resolved', '2026-10-03'],
    ],
    mapPosition: { x: 35, y: 56 },
  },
  {
    id: 'paradise-biryani-secunderabad',
    name: 'Paradise Biryani (Original)',
    cuisine: 'Indian',
    street: 'MG Road, Sappu Bagh',
    locality: 'Secunderabad',
    distance: 6.8,
    image: '/images/spice-route.png',
    lat: 17.4416,
    lng: 78.4871,
    history: [
      ['2026-09-08', 'Routine', 85, 3],
      ['2026-05-15', 'Follow-up', 86, 2],
      ['2026-01-14', 'Routine', 83, 4],
    ],
    violations: [
      ['Hot Holding Steam Table', 'Biryani degh warmer dropped to 132°F; recalibrated to 140°F.', 'Resolved', '2026-09-08'],
      ['Food Contact Wipe Cloths', 'Cloths not stored in sanitizing bucket between uses.', 'Resolved', '2026-09-08'],
      ['Exhaust Filter Replacement', 'Primary hood duct scheduled for quarterly degreasing.', 'Open', '2026-09-08'],
    ],
    mapPosition: { x: 72, y: 25 },
  },
  {
    id: 'bawarchi-rtc-cross-roads',
    name: 'Bawarchi Restaurant',
    cuisine: 'Indian',
    street: 'RTC Cross Roads, Chikkadpally',
    locality: 'Secunderabad',
    distance: 7.2,
    image: '/images/spice-route.png',
    lat: 17.4069,
    lng: 78.4984,
    history: [
      ['2026-08-30', 'Routine', 82, 4],
      ['2026-05-12', 'Follow-up', 84, 3],
      ['2026-01-20', 'Routine', 80, 4],
    ],
    violations: [
      ['Floor Cleanliness in Rear Galley', 'Spills near heavy cauldron cooking line.', 'Resolved', '2026-08-30'],
      ['Plumbing Hand Sink Pressure', 'Staff hand-washing faucet water pressure low.', 'Resolved', '2026-08-30'],
      ['Duct Hood Maintenance', 'Grease extraction filter required commercial chemical wash.', 'Open', '2026-08-30'],
    ],
    mapPosition: { x: 75, y: 32 },
  },
  {
    id: 'pista-house-charminar',
    name: 'Pista House',
    cuisine: 'Indian',
    street: 'Shalibanda Road, Charminar',
    locality: 'Charminar',
    distance: 8.5,
    image: '/images/saffron-kitchen.png',
    lat: 17.3582,
    lng: 78.4719,
    history: [
      ['2026-09-12', 'Routine', 92, 2],
      ['2026-06-04', 'Routine', 91, 2],
      ['2026-02-14', 'Routine', 90, 2],
    ],
    violations: [
      ['Bakery Packaging Clearance', 'Cardboard sweet boxes stored near wash basin zone.', 'Resolved', '2026-09-12'],
      ['Glove Dispenser Refill', 'Single-use plastic glove dispenser empty on packing line.', 'Resolved', '2026-09-12'],
    ],
    mapPosition: { x: 65, y: 82 },
  },
  {
    id: 'hotel-shadab-charminar',
    name: 'Hotel Shadab',
    cuisine: 'Indian',
    street: 'High Court Rd, Madina Circle',
    locality: 'Charminar',
    distance: 8.1,
    image: '/images/spice-route.png',
    lat: 17.3688,
    lng: 78.4735,
    history: [
      ['2026-08-20', 'Routine', 81, 4],
      ['2026-05-02', 'Routine', 83, 3],
      ['2026-01-10', 'Routine', 79, 5],
    ],
    violations: [
      ['High Volume Dish Stacking', 'Wet clean plates stacked before air drying completely.', 'Resolved', '2026-08-20'],
      ['Waste Bin Lid Closure', 'Kitchen waste receptacle pedal mechanism jammed.', 'Resolved', '2026-08-20'],
      ['Rear Alley Door Weather Stripping', 'Gap under loading dock door needs fresh rubber seal.', 'Open', '2026-08-20'],
    ],
    mapPosition: { x: 66, y: 78 },
  },
  {
    id: 'shah-ghouse-gachibowli',
    name: 'Shah Ghouse Hotel & Restaurant',
    cuisine: 'Indian',
    street: 'Bio-Diversity Junction',
    locality: 'Gachibowli',
    distance: 5.6,
    image: '/images/saffron-kitchen.png',
    lat: 17.4398,
    lng: 78.3685,
    history: [
      ['2026-08-15', 'Complaint', 76, 5],
      ['2026-05-10', 'Routine', 80, 4],
      ['2026-02-01', 'Routine', 78, 4],
    ],
    violations: [
      ['Walk-in Cold Storage Shelving', 'Rust flakes noted on non-stainless meat rack.', 'Resolved', '2026-08-15'],
      ['Grease Trap Servicing', 'Under-sink grease interceptor overflowing maintenance schedule.', 'Resolved', '2026-08-15'],
      ['Food Temperature Thawing', 'Frozen meat thawed in standing water bath instead of chiller.', 'Resolved', '2026-08-15'],
      ['Rear Delivery Dock Cleanliness', 'Trash bags left unsealed near loading threshold.', 'Open', '2026-08-15'],
    ],
    mapPosition: { x: 62, y: 38 },
  },
  {
    id: 'fishermans-wharf-gachibowli',
    name: "The Fisherman's Wharf",
    cuisine: 'Continental',
    street: 'Financial District, ISB Road',
    locality: 'Gachibowli',
    distance: 7.0,
    image: '/images/urban-grill.png',
    lat: 17.4215,
    lng: 78.3442,
    history: [
      ['2026-09-25', 'Routine', 94, 2],
      ['2026-06-18', 'Routine', 92, 2],
      ['2026-02-22', 'Routine', 93, 1],
    ],
    violations: [
      ['Seafood Crushed Ice Bedding', 'Display ice melted below 3-inch depth; replenished immediately.', 'Resolved', '2026-09-25'],
      ['Sanitizer Solution Concentration', 'Bleach sanitizer bucket measured 80ppm; adjusted to 100ppm.', 'Resolved', '2026-09-25'],
    ],
    mapPosition: { x: 68, y: 46 },
  },
  {
    id: 'absolute-barbecues-gachibowli',
    name: 'Absolute Barbecues',
    cuisine: 'Indian',
    street: 'Old Mumbai Highway',
    locality: 'Gachibowli',
    distance: 6.2,
    image: '/images/urban-grill.png',
    lat: 17.4429,
    lng: 78.3582,
    history: [
      ['2026-09-02', 'Routine', 87, 3],
      ['2026-05-24', 'Routine', 88, 3],
      ['2026-01-30', 'Routine', 85, 4],
    ],
    violations: [
      ['Live Grill Drip Trays', 'Skewered grill table grease catchers had burnt drippings.', 'Resolved', '2026-09-02'],
      ['Buffet Sneeze Guard Angle', 'Salad section glass guard required adjustment.', 'Resolved', '2026-09-02'],
    ],
    mapPosition: { x: 60, y: 36 },
  },
  {
    id: 'kritunga-restaurant-madhapur',
    name: 'Kritunga - The Palegars',
    cuisine: 'Indian',
    street: '100 Feet Road',
    locality: 'Madhapur',
    distance: 4.2,
    image: '/images/curry-leaf.png',
    lat: 17.4485,
    lng: 78.3908,
    history: [
      ['2026-08-18', 'Routine', 74, 5],
      ['2026-05-10', 'Routine', 77, 4],
      ['2026-01-22', 'Routine', 75, 4],
    ],
    violations: [
      ['Chili Cooking Vapor Ventilation', 'Kitchen exhaust air velocity insufficient for heavy spice sauté.', 'Resolved', '2026-08-18'],
      ['Raw Poultry Separation', 'Marinated chicken bowl placed on shelf above chopped cabbage.', 'Resolved', '2026-08-18'],
      ['Hand Towel Dispenser', 'Prep line hand sink lacked paper towels.', 'Resolved', '2026-08-18'],
      ['Storage Floor Cleanliness', 'Rice sack store room floor dusty.', 'Open', '2026-08-18'],
    ],
    mapPosition: { x: 52, y: 34 },
  },
  {
    id: 'mamagoto-banjara-hills',
    name: 'Mamagoto',
    cuisine: 'Asian',
    street: 'Road No. 12',
    locality: 'Banjara Hills',
    distance: 1.3,
    image: '/images/noodle-bistro.png',
    lat: 17.4175,
    lng: 78.4431,
    history: [
      ['2026-09-24', 'Routine', 91, 2],
      ['2026-06-19', 'Routine', 90, 2],
      ['2026-02-14', 'Routine', 89, 3],
    ],
    violations: [
      ['Cutting Board Scoring', 'Red cutting board had deep knife grooves; scheduled for replacement.', 'Resolved', '2026-09-24'],
      ['Chemical Storage Separation', 'Sanitizer spray bottle placed next to dry pantry syrups.', 'Resolved', '2026-09-24'],
    ],
    mapPosition: { x: 37, y: 54 },
  },
  {
    id: 'minerva-coffee-shop-begumpet',
    name: 'Minerva Coffee Shop',
    cuisine: 'Indian',
    street: 'Himayatnagar & Begumpet',
    locality: 'Begumpet',
    distance: 5.9,
    image: '/images/curry-leaf.png',
    lat: 17.4019,
    lng: 78.4839,
    history: [
      ['2026-09-29', 'Routine', 94, 2],
      ['2026-06-22', 'Routine', 93, 2],
      ['2026-03-05', 'Routine', 92, 2],
    ],
    violations: [
      ['Filter Coffee Boiler Temp', 'Boiler water temperature sensor reading unverified.', 'Resolved', '2026-09-29'],
      ['Dosa Griddle Scraper Cleanliness', 'Tool hung in non-designated hook station.', 'Resolved', '2026-09-29'],
    ],
    mapPosition: { x: 68, y: 52 },
  },
  {
    id: 'grand-hotel-abids',
    name: 'Grand Hotel',
    cuisine: 'Indian',
    street: 'Opposite SBH, 4-1-395',
    locality: 'Abids',
    distance: 6.5,
    image: '/images/spice-route.png',
    lat: 17.3912,
    lng: 78.4764,
    history: [
      ['2026-08-12', 'Routine', 72, 6],
      ['2026-04-20', 'Routine', 76, 5],
      ['2026-01-15', 'Complaint', 73, 5],
    ],
    violations: [
      ['Heritage Facility Dampness', 'Rear dry storage wall showed moisture penetration.', 'Resolved', '2026-08-12'],
      ['Pest Control Sealing', 'Gaps around old timber floor threshold need metal kick-plate.', 'Open', '2026-08-12'],
      ['Food Contact Surface Sanitization', 'Manual dish pit three-compartment sink rinse water tepid.', 'Resolved', '2026-08-12'],
      ['Food Temperature Log Book', 'Tandoor meat internal cooking logs incomplete for 2 days.', 'Resolved', '2026-08-12'],
    ],
    mapPosition: { x: 64, y: 65 },
  },
  {
    id: 'punjabi-affair-kondapur',
    name: 'Punjabi Affair',
    cuisine: 'Indian',
    street: 'Raghava Colony, Near Toyota',
    locality: 'Kondapur',
    distance: 6.4,
    image: '/images/curry-leaf.png',
    lat: 17.4619,
    lng: 78.3612,
    history: [
      ['2026-09-04', 'Routine', 86, 3],
      ['2026-05-18', 'Routine', 87, 2],
      ['2026-02-05', 'Routine', 85, 3],
    ],
    violations: [
      ['Clay Oven Ash Removal', 'Tandoor pit ash bucket kept near uncooked naan dough counter.', 'Resolved', '2026-09-04'],
      ['Dairy Product Rotation', 'Paneer batch missing FIFO delivery rotation sticker.', 'Resolved', '2026-09-04'],
    ],
    mapPosition: { x: 56, y: 28 },
  },
  {
    id: 'telangana-spice-kitchen-jubilee',
    name: 'Telangana Spice Kitchen',
    cuisine: 'Indian',
    street: 'Road No. 36',
    locality: 'Jubilee Hills',
    distance: 2.1,
    image: '/images/saffron-kitchen.png',
    lat: 17.4292,
    lng: 78.4081,
    history: [
      ['2026-09-18', 'Routine', 91, 2],
      ['2026-06-02', 'Routine', 90, 2],
      ['2026-02-19', 'Routine', 88, 3],
    ],
    violations: [
      ['Native Ghee Canister Storage', 'Earthen jars lacked silicone seal gaskets.', 'Resolved', '2026-09-18'],
      ['Hair Restraint Enforcement', 'Assistant commis chef hair net not completely covering sideburns.', 'Resolved', '2026-09-18'],
    ],
    mapPosition: { x: 41, y: 49 },
  },
  {
    id: 'street-wok-express-gachibowli',
    name: 'Street Wok Express',
    cuisine: 'Asian',
    street: 'Indira Nagar, Near DLF Gate 1',
    locality: 'Gachibowli',
    distance: 6.1,
    image: '/images/street-wok.png',
    lat: 17.4478,
    lng: 78.3601,
    history: [
      ['2026-09-15', 'Complaint', 56, 7],
      ['2026-06-20', 'Follow-up', 64, 6],
      ['2026-02-10', 'Routine', 68, 5],
    ],
    violations: [
      ['Critical Temperature Abuse', 'Raw chicken thawing in open ambient air at 84°F.', 'Critical', '2026-09-15'],
      ['Pest Infestation Evidence', 'Rodent droppings detected beneath rear dry ingredient shelf.', 'Critical', '2026-09-15'],
      ['Cross Contamination Hazard', 'Same unwashed cutting board utilized for raw poultry and garnishes.', 'Critical', '2026-09-15'],
      ['Failed Handwashing Station', 'Main kitchen handwashing sink disconnected from hot water line.', 'Open', '2026-09-15'],
    ],
    mapPosition: { x: 61, y: 33 },
  },
  {
    id: 'spicy-venue-jubilee-hills',
    name: 'The Spicy Venue',
    cuisine: 'Indian',
    street: 'Road No. 10',
    locality: 'Jubilee Hills',
    distance: 1.8,
    image: '/images/curry-leaf.png',
    lat: 17.4312,
    lng: 78.4141,
    history: [
      ['2026-09-21', 'Routine', 92, 2],
      ['2026-06-14', 'Routine', 91, 2],
      ['2026-02-25', 'Routine', 89, 3],
    ],
    violations: [
      ['Dessert Chiller Calibration', 'Apricot delight display cooler was at 43°F; adjusted to 38°F.', 'Resolved', '2026-09-21'],
      ['Food Contact Aprons', 'Aprons hung on electrical conduits instead of designated locker.', 'Resolved', '2026-09-21'],
    ],
    mapPosition: { x: 43, y: 51 },
  },
]

const clamp = (n: number) => Math.max(40, Math.min(100, Math.round(n)))

function buildCategories(score: number, offset: number): CategoryScores {
  const o = [0, -1, -3, 1, 2, -2].map((d, i) => d + ((offset + i) % 3) - 1)
  return {
    foodHandling: clamp(score + o[0]),
    kitchenHygiene: clamp(score + o[1]),
    temperatureControl: clamp(score + o[2]),
    foodStorage: clamp(score + o[3]),
    pestControl: clamp(score + o[4] + (score < 70 ? -12 : 0)),
    employeeHygiene: clamp(score + o[5]),
  }
}

function outcome(score: number): InspectionOutcome {
  if (score >= 80) return 'Passed'
  if (score >= 70) return 'Conditional'
  return 'Failed'
}

const NOTES: Record<InspectionOutcome, string> = {
  Passed: 'Establishment meets GHMC & FSSAI food safety standards. Minor observations discussed with the kitchen manager.',
  Conditional: 'Multiple hygiene violations noted. Corrective actions required and follow-up audit scheduled within 14 days.',
  Failed: 'Critical food safety violations detected posing immediate public health hazard. Immediate closure and rectifications mandated.',
}

export const restaurants: Restaurant[] = seeds.map((seed, index) => {
  const inspectionHistory: Inspection[] = seed.history.map(([date, type, score, violations], i) => {
    const status = outcome(score)
    return {
      id: `${seed.id}-insp-${i}`,
      date,
      type,
      score,
      grade: gradeFromScore(score),
      violations,
      status,
      inspector: INSPECTORS[(index + i) % INSPECTORS.length],
      notes: NOTES[status],
    }
  })
  const latest = inspectionHistory[0]
  const grade = gradeFromScore(latest.score)
  const violations: Violation[] = seed.violations.map(([title, description, status, date], i) => ({
    id: `${seed.id}-v-${i}`,
    title,
    description,
    status,
    date,
  }))

  return {
    id: seed.id,
    name: seed.name,
    cuisine: seed.cuisine,
    address: `${seed.street}, ${seed.locality}`,
    locality: seed.locality,
    city: 'Hyderabad',
    grade,
    healthScore: latest.score,
    lastInspectionDate: latest.date,
    inspectionStatus: statusFromGrade(grade),
    distance: seed.distance,
    image: seed.image,
    violations,
    inspectionHistory,
    categories: buildCategories(latest.score, index),
    mapPosition: seed.mapPosition,
    lat: seed.lat,
    lng: seed.lng,
  }
})

export const CUISINES: Cuisine[] = ['Indian', 'Asian', 'Italian', 'French', 'Healthy', 'Continental']

export const LOCALITIES = [
  'Banjara Hills',
  'Jubilee Hills',
  'Hitech City',
  'Gachibowli',
  'Madhapur',
  'Kondapur',
  'Charminar',
  'Secunderabad',
  'Begumpet',
  'Abids',
]

export function getRestaurant(id: string) {
  return restaurants.find((r) => r.id === id)
}

export function getTopRestaurants(count = 6) {
  return [...restaurants].sort((a, b) => b.healthScore - a.healthScore).slice(0, count)
}

export const CATEGORY_LABELS: Record<keyof CategoryScores, string> = {
  foodHandling: 'Food Handling',
  kitchenHygiene: 'Kitchen Hygiene',
  temperatureControl: 'Temperature Control',
  foodStorage: 'Food Storage',
  pestControl: 'Pest Control',
  employeeHygiene: 'Employee Hygiene',
}
