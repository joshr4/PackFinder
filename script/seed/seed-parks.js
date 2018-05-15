

const axios = require('axios');
const faker = require('faker');


// const toonAvatar = require('cartoon-avatar');
const Promise = require('bluebird');
const db = require('../../server/db');
const { Address, Park } = require('../../server/db/models');

function doTimes(n, fn) {
  const results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}
// build a park
// setAddress

const parks = [
  {
    name: 'Anderson Dog Friendly Areas',
    line_1: '1611 S. Wabash Avenue',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60601',
    location: { lat: 41.859734, lng: -87.625156 }
  },
  {
    name: 'Bartelme Dog Friendly Area',
    line_1: '115 S. Sangamon',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60607',
    location: { lat: 41.879807, lng: -87.650484 }
  },
  {
    name: 'Bryn Mawr Dog Friendly Area - TEMPORARY',
    line_1: 'Bryn Mawr & Lake Shore Drive',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60614',
    location: { lat: 41.9837863, lng: -87.6520951 }
  },
  {
    name: 'Challenger Dog Friendly Area',
    line_1: '1100 W. Irving Park Rd.',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60613',
    location: { lat: 41.954629, lng: -87.6572544 }
  },
  {
    name: 'Churchill Dog Friendly Area',
    line_1: '1825 N. Damen Ave.',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60614',
    location: { lat: 41.9143687, lng: -87.6770674 }
  },
  {
    name: 'Clarendon Dog Friendly Area',
    line_1: '4501 N. Marine Drive',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60640',
    location: { lat: 41.9637614, lng: -87.6479475 }
  },
  {
    name: 'Coliseum Dog Friendly Area',
    line_1: '1466 S. Wabash Ave.',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60605',
    location: { lat: 41.8621523, lng: -87.6261511 }
  },
  {
    name: 'Grant Dog Friendly Area',
    line_1: '951 S. Columbus Drive',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60601',
    location: { lat: 41.8731553, lng: -87.6205775 }
  },
  {
    name: 'Hamlin Dog Friendly Area',
    line_1: '3035 N. Hoyne Ave.',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60618',
    location: { lat: 41.9370863, lng: -87.6805212 }
  },
  {
    name: 'Lake Shore East Dog Friendly Area',
    line_1: '450 E Benton Pl',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60601',
    location: {lat: 41.8858918, lng: -87.6175994}
  },
  {
    name: 'Montrose Beach DFA',
    line_1: '601 West Montrose Avenue',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60613',
    location: { lat: 41.9630332, lng: -87.6381737 }
  },
  {
    name: 'Noethling Playlot Dog Friendly Area',
    line_1: '2645 N. Sheffield Ave.',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60614',
    location: { lat: 41.9305329, lng: -87.653434 }
  },
  {
    name: 'Norwood Dog Friendly Area',
    line_1: '5899 N. Avondale',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60631',
    location: {lat: 41.9888747, lng: -87.7946225}
  },
  {
    name: 'Park No. 551 Dog Friendly Area',
    line_1: '353 N. DesPlaines St.',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60611',
    location: { lat: 41.8883428, lng: -87.6435451 }
  },
  {
    name: 'Park No. 556 Dog Friendly Area',
    line_1: '2529 W. Logan Blvd',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60647',
    location: { lat: 41.927959, lng: -87.6883919 }
  },
  {
    name: 'Park No. 569 Dog Friendly Area',
    line_1: '1358 W. Monroe',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60607',
    location: { lat: 41.8802737, lng: -87.6609671 }
  },
  {
    name: 'Portage Dog Friendly Area',
    line_1: '4100 N. Long',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60641',
    location: { lat: 41.955369, lng: -87.7635893 }
  },
  {
    name: 'Pottawattomie Dog Friendly Area',
    line_1: '7340 N. Rogers Ave.',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60626',
    location: { lat: 42.0151089, lng: -87.6780689 }
  },
  {
    name: 'Puptown',
    line_1: '4900 N Marine Drive',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60640',
    location: { lat: 41.972296, lng: -87.651904 }
  },
  {
    name: 'River Dog Friendly Area',
    line_1: '5100 N. Francisco Ave.',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60625',
    location: { lat: 41.9739995, lng: -87.7019812 }
  },
  {
    name: 'Walsh Dog Friendly Area',
    line_1: '1722 N. Ashland Ave.',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60614',
    location: { lat: 41.9131819, lng: -87.6678591 }
  },
  {
    name: 'Ward Dog Friendly Area',
    line_1: '630 N. Kingsbury St.',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60606',
    location: { lat: 41.8936415, lng: -87.6419353 }
  },
  {
    name: 'Wicker Dog Friendly Area',
    line_1: '1425 N. Damen Ave.',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60622',
    location: { lat: 41.9080486, lng: -87.676738 }
  },
  {
    name: 'Whalon Lake Dog Park',
    line_1: '1480 Royce Rd',
    city: 'NaperVille',
    state: 'IL',
    zipcode: '60565',
    location: { lat: 41.7184357, lng: -88.1008634 }
  },
  {
    name: 'Green Valley Forest Preserve',
    line_1: '899 Greene Rd',
    city: 'NaperVille',
    state: 'IL',
    zipcode: '60565',
    location: { lat: 41.727918, lng: -88.075622 }
  },
  {
    name: 'Katherine Legge Memorial Lodge Dog Park',
    line_1: '5901 S County Line Rd',
    city: 'Hinsdale',
    state: 'IL',
    zipcode: '60521',
    location: { lat: 41.78209, lng: -87.914902 }
  },
  {
    name: 'Prairie Wolf Dog Park',
    line_1: '2075 S Waukegan Rd',
    city: 'Lake Forest',
    state: 'IL',
    zipcode: '60045',
    location: { lat: 42.2038955, lng: -87.8647805 }
  },
  {
    name: 'Winnemac Park',
    line_1: '5100 N Damen Ave',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60625',
    location: { lat: 41.9744269, lng: -87.6793603 }
  },
  {
    name: 'Mayslake Forest Preserve Dog Park',
    line_1: '1717 31st St',
    city: 'Oak Brook',
    state: 'IL',
    zipcode: '60523',
    location: { lat: 41.8284183, lng: -87.9608555 }
  },
  {
    name: 'SpringBrook Prairie Dog Park',
    line_1: '83rd St & Brook Rd',
    city: 'Naperville',
    state: 'IL',
    zipcode: '60564',
    location: { lat: 41.7327857, lng: -88.1866295 }
  },
  {
    name: 'White Oak Park',
    line_1: '1514 N Cottage Ave',
    city: 'Bloomington',
    state: 'IL',
    zipcode: '61701',
    location: { lat: 40.492377, lng: -89.01166 }
  },
  {
    name: 'Messenger Marsh Dog Park',
    line_1: 'S Bell Rd & 159th St',
    city: 'Homer Glen',
    state: 'IL',
    zipcode: '60491',
    location: { lat: 41.599967, lng: -87.9300807 }
  },
  {
    name: 'Best Friends Dog Park Club',
    line_1: '22096 N Pet Ln',
    city: 'Buffalo Grove',
    state: 'IL',
    zipcode: '60089',
    location: { lat: 42.1840538, lng: -87.9514743 }
  },
  {
    name: 'Jackson Bark',
    line_1: '5800 S Lake Shore Dr',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60637',
    location: { lat: 41.7900692, lng: -87.5790999 }
  },
  {
    name: 'Bremen Grove Off Leash Area',
    line_1: '15874 Oak Park Ave',
    city: 'Tinley Park',
    state: 'IL',
    zipcode: '60477',
    location: { lat: 41.6028353, lng: -87.785361 }
  },
  {
    name: 'Joe Glik Park',
    line_1: '710 E Lake Dr',
    city: 'Edwardsville',
    state: 'IL',
    zipcode: '62025',
    location: { lat: 38.7938122, lng: -89.9256656 }
  },
  {
    name: 'Batavia Bark Park',
    line_1: '40W101 W Main St',
    city: 'Batavia',
    state: 'IL',
    zipcode: '60510',
    location: { lat: 41.8452841, lng: -88.396675 }
  },
  {
    name: 'Chopin Dog Park',
    line_1: '3420 N Long Ave',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60641',
    location: { lat: 41.9553018, lng: -87.7635554 }
  },
  {
    name: 'Bradley Dog Park',
    line_1: '1314 N Park Rd',
    city: 'Peoria',
    state: 'IL',
    zipcode: '61604',
    location: { lat: 40.703659, lng: -89.6254373 }
  },
  {
    name: 'Ridge Park',
    line_1: '2800 Oakton St',
    city: 'Park Ridge',
    state: 'IL',
    zipcode: '60068',
    location: { lat: 42.0252167, lng: -87.8621774 }
  },
  {
    name: 'Spring Avenue Dog Park',
    line_1: '185 Spring Ave',
    city: 'Glen Ellyn',
    state: 'IL',
    zipcode: '60137',
    location: { lat: 41.8659373, lng: -88.046013 }
  },
  {
    name: 'Canine Corners Dog Park at Searls Park',
    line_1: '4950 Safford Rd',
    city: 'Rockford',
    state: 'IL',
    zipcode: '61101',
    location: { lat: 42.3036541, lng: -89.1303132 }
  },
  {
    name: 'Bo\'s Run',
    line_1: '3600 Lexington Dr',
    city: 'Hoffman Estates',
    state: 'IL',
    zipcode: '60192',
    location: { lat: 42.0892626, lng: -88.1058732 }
  },
  {
    name: 'Elliott Dog Park',
    line_1: 'Tebala Blvd & Old Mill Rd',
    city: 'Rockford',
    state: 'IL',
    zipcode: '61108',
    location: { lat: 42.2619877, lng: -88.9596545 }
  },
  {
    name: 'Lincoln Dog Park',
    line_1: '239 N Lincoln Ave',
    city: 'Aurora',
    state: 'IL',
    zipcode: '60505',
    location: { lat: 41.7607612, lng: -88.3062794 }
  },
  {
    name: 'Green Valley Forest Preserve Dog Park',
    line_1: '2129 75th St',
    city: 'Naperville',
    state: 'IL',
    zipcode: '60565',
    location: { lat: 41.7497097, lng: -88.0690572 }
  },
  {
    name: 'Bull Valley Dog Park',
    line_1: '11115 Country Club Rd',
    city: 'Woodstock',
    state: 'IL',
    zipcode: '60098',
    location: { lat: 42.3045455, lng: -88.3873672 }
  },
  {
    name: 'Lakewood Dog Park',
    line_1: '27511 N Fairfield Rd',
    city: 'Wauconda',
    state: 'IL',
    zipcode: '60084',
    location: { lat: 42.2641672, lng: -88.1018053 }
  },
  {
    name: 'Hammel Woods Dog Park',
    line_1: '550 Brook Forest Ave',
    city: 'Shorewood',
    state: 'IL',
    zipcode: '60404',
    location: { lat: 41.530307, lng: -88.197971 }
  },
  {
    name: 'Maxwell Dog Park',
    line_1: '301 County Rd 1300 E',
    city: 'Normal',
    state: 'IL',
    zipcode: '61761',
    location: { lat: 40.513883, lng: -89.0211172 }
  },
  {
    name: 'O\'Fallon Dog Park at Rock Springs Park',
    line_1: '1428 E 3rd Street',
    city: 'OFallon',
    state: 'IL',
    zipcode: '62269',
    location: { lat: 38.587582, lng: -89.885604 }
  },
  {
    name: 'East Branch Forest Preserve Off Leash Dog Area',
    line_1: 'Swift Rd & N Ave',
    city: 'Glendale Heights',
    state: 'IL',
    zipcode: '60148',
    location: { lat: 41.9041135, lng: -88.0428956 }
  },
  {
    name: 'Lake Shore Park',
    line_1: '808 N Lake Shore Dr',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60611',
    location: { lat: 41.8972899, lng: -87.6198355 }
  },
  {
    name: 'Community Bark West',
    line_1: '1001 Zenith Dr',
    city: 'Glenview',
    state: 'IL',
    zipcode: '60025',
    location: { lat: 42.0674173, lng: -87.8656999 }
  },
  {
    name: 'Robert C. Porter Family Park',
    line_1: 'Windsor Rd & S Rising Rd',
    city: 'Champaign',
    state: 'IL',
    zipcode: '61822',
    location: { lat: 40.0841658, lng: -88.332953 }
  },
  {
    name: 'Mt. Greenwood Park',
    line_1: '3721 W 111th St',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60655',
    location: { lat: 41.6910646, lng: -87.7137371 }
  },
  {
    name: 'Stuart Dog Park',
    line_1: '1 Carpenter Park Trail',
    city: 'Springfield',
    state: 'IL',
    zipcode: '62707',
    location: { lat: 39.870174, lng: -89.6275185 }
  },
  {
    name: 'Pooch Park',
    line_1: '3220 Oakton St',
    city: 'Skokie',
    state: 'IL',
    zipcode: '60077',
    location: { lat: 42.0280664, lng: -87.709141 }
  },
  {
    name: 'Phillips Park Dog Park',
    line_1: '1000 Ray Moses Dr',
    city: 'Aurora',
    state: 'IL',
    zipcode: '60505',
    location: { lat: 41.7357114, lng: -88.2935296 }
  },
  {
    name: 'Maple Park Dog Park',
    line_1: '1105 S Maple Ave',
    city: 'Oak Park',
    state: 'IL',
    zipcode: '60130',
    location: { lat: 41.8684577, lng: -87.803443 }
  },
  {
    name: 'Friends of Murphysboro Dog Park',
    line_1: '2610 Riverside Park Rd',
    city: 'Murphysboro',
    state: 'IL',
    zipcode: '62966',
    location: { lat: 37.7560384, lng: -89.3568027 }
  },
  {
    name: 'Trantina Farm Dog Park',
    line_1: '15717 W 151st St',
    city: 'Homer Glen',
    state: 'IL',
    zipcode: '60491',
    location: { lat: 41.6134611, lng: -87.9789534 }
  },
  {
    name: 'Dog Park at White Oaks Park',
    line_1: '111 S Wood Dale Rd',
    city: 'Wood Dale',
    state: 'IL',
    zipcode: '60191',
    location: { lat: 41.9561249, lng: -87.9780952 }
  },
  {
    name: 'Frankfort Bark Park at Commissioners Park',
    line_1: '22108 S 80th Ave',
    city: 'Frankford',
    state: 'IL',
    zipcode: '60423',
    location: { lat: 41.487733, lng: -87.8113236 }
  },
  {
    name: 'Central Bark',
    line_1: '127th St & Timberline Dr',
    city: 'Lemont',
    state: 'IL',
    zipcode: '60439',
    location: { lat: 41.6563777, lng: -88.0136153 }
  },
  {
    name: 'Puptown at MargatePark',
    line_1: '4921 N Marine Dr',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60640',
    location: { lat: 41.972088, lng: -87.6497743 }
  },
  {
    name: 'Happy Tails',
    line_1: '835 Commerce Ct',
    city: 'Buffalo Grove',
    state: 'IL',
    zipcode: '60089',
    location: { lat: 42.169265, lng: -87.943417 }
  },
  {
    name: 'Harlem Township Rover Run',
    line_1: '10500 Ventura Blvd',
    city: 'Machesney Park',
    state: 'IL',
    zipcode: '61115',
    location: { lat: 42.3832813, lng: -89.0444472 }
  },
  {
    name: 'Promontory Point',
    line_1: '5491 S South Shore Dr',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60649',
    location: { lat: 41.7734862, lng: -87.5668031 }
  },
  {
    name: 'Kristi B\'s Best Dog Retreat West Chicago',
    line_1: '29W516 Wilson Rd',
    city: 'West Chicago',
    state: 'IL',
    zipcode: '60185',
    location: { lat: 41.8576071, lng: -88.2001089 }
  },
  {
    name: 'Lake in the Hills Dog Park',
    line_1: '9027 Haligus Rd',
    city: 'Lake in the Hills',
    state: 'IL',
    zipcode: '60156',
    location: { lat: 42.1985939, lng: -88.3983048 }
  },
  {
    name: 'Keppler Park Dog Park',
    line_1: '241 E National St',
    city: 'West Chicago',
    state: 'IL',
    zipcode: '60185',
    location: { lat: 41.8932541, lng: -88.2038472 }
  },
  {
    name: 'Stuart Sports Complex Dog Park',
    line_1: '6704 Base Line Rd',
    city: 'Aurora',
    state: 'IL',
    zipcode: '60506',
    location: { lat: 41.7224623, lng: -88.3860903 }
  },
  {
    name: 'Blackwell Dog Park & Training Field',
    line_1: '29 Mack Rd',
    city: 'Warrenville',
    state: 'IL',
    zipcode: '60185',
    location: { lat: 41.8423894, lng: -88.203898 }
  },
  {
    name: 'Warren Park',
    line_1: '6601 N Wern Ave',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60645',
    location: { lat: 42.0021787, lng: -87.6890062 }
  },
  {
    name: 'Duck Farm Dog Park',
    line_1: '1439 E Grand Ave',
    city: 'Lake Villa',
    state: 'IL',
    zipcode: '60046',
    location: { lat: 42.4153789, lng: -88.0466023 }
  },
  {
    name: 'Shepard Park Dog Park',
    line_1: '750 Hershey Rd',
    city: 'Normal',
    state: 'IL',
    zipcode: '61761',
    location: { lat: 40.5217271, lng: -88.9429393 }
  },
  {
    name: 'Forest Park Dog Park',
    line_1: '7327 Lehmer St',
    city: 'Forest Park',
    state: 'IL',
    zipcode: '60130',
    location: { lat: 41.8748872, lng: -87.8082105 }
  },
  {
    name: 'Fido Fields',
    line_1: '1295 W Wood St',
    city: 'Decatur',
    state: 'IL',
    zipcode: '62526',
    location:  { lat: 39.8397219, lng: -88.9766943 }
  },
  {
    name: 'McBark Dog Park',
    line_1: '2500 N Richmond Rd',
    city: 'Mchenry',
    state: 'IL',
    zipcode: '60051',
    location: { lat: 42.3671069, lng: -88.2675911 }
  },
  {
    name: 'Eleanor Wallace Dog Park',
    line_1: '2898 78th Ave W',
    city: 'Rock Island',
    state: 'IL',
    zipcode: '61201',
    location: { lat: 41.4434979, lng: -90.6068923 }
  },
  {
    name: 'Swansea Dog Park',
    line_1: '1500 Caseyville Ave',
    city: 'Swansea',
    state: 'IL',
    zipcode: '62226',
    location: { lat: 38.5298823, lng: -89.9922919 }
  },
  {
    name: 'Veteran Acres Park',
    line_1: '330 N Main St',
    city: 'Crystal Lake',
    state: 'IL',
    zipcode: '60014',
    location: { lat: 42.2496697, lng: -88.316126 }
  },
  {
    name: 'Berger Park',
    line_1: '6205 N Sheridan Rd',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60660',
    location:  { lat: 41.9948792, lng: -87.6551459 }
  },
  {
    name: 'Urbana Dog Park',
    line_1: '1501 E Perkins Rd',
    city: 'Urbana',
    state: 'IL',
    zipcode: '61803',
    location: { lat: 40.124499, lng: -88.187988 }
  },
  {
    name: 'Jaycee Dog Park',
    line_1: '1050 Wilmot Rd',
    city: 'Deerfield',
    state: 'IL',
    zipcode: '60015',
    location: { lat: 42.1721851, lng: -87.8670333 }
  },
  {
    name: 'Miller Meadow Off-Leash Dog Area',
    line_1: '2175 S 1st Ave',
    city: 'Forest Park',
    state: 'IL',
    zipcode: '60130',
    location: { lat: 41.8646077, lng: -87.8333812 }
  },
  {
    name: 'Oakwood Dog Park',
    line_1: '22101 N Main St',
    city: 'Morton',
    state: 'IL',
    zipcode: '61550',
    location: { lat: 40.6357443, lng: -89.4504314 }
  },
  {
    name: 'Rover\'s Run Dog Park',
    line_1: '191st St & Center Ave',
    city: 'Homewood',
    state: 'IL',
    zipcode: '60430',
    location: { lat: 41.5423879, lng: -87.6455655 }
  },
  {
    name: 'Norwood Dog Park',
    line_1: '5801 N Natoma Ave',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60631',
    location: { lat: 41.9866925, lng: -87.7934494 }
  },
  {
    name: 'Herrin Park Dog Park',
    line_1: '1010 N 5th St',
    city: 'Herrin',
    state: 'IL',
    zipcode: '62948',
    location: { lat: 37.8132825, lng: -89.0154788 }
  },
  {
    name: 'Hawk Hollow Preserve',
    line_1: 'Bittersweet Dr and Stearns Rd',
    city: 'Bartlett',
    state: 'IL',
    zipcode: '60103',
    location:  { lat: 41.9723844, lng: -88.1646113 }
  },
  {
    name: 'Friends of Forever Dog Park',
    line_1: '966 Rudy Rd',
    city: 'Freeport',
    state: 'IL',
    zipcode: '61032',
    location: { lat: 42.2483596, lng: -89.6289161 }
  },
  {
    name: 'Nelson Park Dog Park',
    line_1: '750 Nelson Blvd',
    city: 'Decatur',
    state: 'IL',
    zipcode: '62521',
    location: { lat: 39.8363794, lng: -88.9192707 }
  },
  {
    name: 'Bark Park',
    line_1: '849 W Lies Rd',
    city: 'Carol Stream',
    state: 'IL',
    zipcode: '60188',
    location: { lat: 41.9310594, lng: -88.149343 }
  },
  {
    name: 'Happy Tails Dog Park at Mineral Springs Park',
    line_1: '500 Coal Car Dr',
    city: 'Pekin',
    state: 'IL',
    zipcode: '61554',
    location: { lat: 40.5631507, lng: -89.6265421 }
  },
  {
    name: 'Greenvalley Dog Park',
    line_1: '6009 50th Ave',
    city: 'Moline',
    state: 'IL',
    zipcode: '61265',
    location: { lat: 41.4639245, lng: -90.454246 }
  },
  {
    name: 'Patton Dog Park',
    line_1: '728 Patton Park',
    city: 'Macomb',
    state: 'IL',
    zipcode: '61455',
    location:  { lat: 40.4488999, lng: -90.6838526 }
  },
  {
    name: 'Washington Bark District Off-Leash Dog Park',
    line_1: '525 Ernest St',
    city: 'Washington',
    state: 'IL',
    zipcode: '61571',
    location: { lat: 40.6909716, lng: -89.4634778 }
  },
  {
    name: 'Baker Park',
    line_1: 'W 6th St & Pleasure Dr',
    city: 'Kewanee',
    state: 'IL',
    zipcode: '61443',
    location: { lat: 41.249126, lng: -89.9355472 }
  },
  {
    name: 'Jacksonville PetSafe Dog Park',
    line_1: '894 E Vandalia Rd',
    city: 'Jacksonville',
    state: 'IL',
    zipcode: '62650',
    location: { lat: 39.7104621, lng: -90.2069962 }
  },
  {
    name: 'Champaign Bark District Dog Park',
    line_1: '5001 W Windsor Ave',
    city: 'Champaign',
    state: 'IL',
    zipcode: '61822',
    location: { lat: 40.0838312, lng: -88.3176859 }
  },
  {
    name: 'Happy Bark Dog Park',
    line_1: '91st and Rockwell',
    city: 'Evergreen Park',
    state: 'IL',
    zipcode: '60805',
    location: { lat: 41.7281791, lng: -87.6874056 }
  },
  {
    name: 'Montrose Dog Beach',
    line_1: 'W Lawrence Ave & W Wilson Dr',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60640',
    location: { lat: 41.9667119, lng: -87.6428465 }
  },
  {
    name: 'Belmont Harbor Beach',
    line_1: 'US-41 & W Belmont Ave',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60675',
    location: { lat: 41.9396378, lng: -87.6372193 }
  },
  {
    name: 'Sirius Dog Run',
    line_1: '385 S End Ave',
    city: 'New York',
    state: 'NY',
    zipcode: '72758',
    location: { lat: 40.7114022, lng: -74.0161478 }
  },
  {
    name: 'Central Park',
    line_1: '455 Central Park W',
    city: 'New York',
    state: 'NY',
    zipcode: '10025',
    location: { lat: 40.7978157, lng: -73.9608256 }
  },
  {
    name: 'West 72nd Street Dog Run',
    line_1: 'W 72nd St & Riverside Dr',
    city: 'New York',
    state: 'NY',
    zipcode: '10023',
    location: { lat: 40.7803211, lng: -73.9857008 }
  },
  {
    name: 'Stuyvesant Park Dog Run',
    line_1: '2nd Ave & E 17th St',
    city: 'New York',
    state: 'NY',
    zipcode: '10003',
    location: { lat: 40.734242, lng: -73.9835512 }
  },
  {
    name: 'Madison Square Park Dog Run',
    line_1: '23rd St & Madison Ave',
    city: 'New York',
    state: 'NY',
    zipcode: '10010',
    location: { lat: 40.7408761, lng: -73.9879814 }
  },
  {
    name: 'Carl Schurz Dog Park',
    line_1: '157 East End Ave',
    city: 'New York',
    state: 'NY',
    zipcode: '10028',
    location: { lat: 40.7748145, lng: -73.9448786 }
  },
  {
    name: 'Pug Hill',
    line_1: '5th Ave & E 74th St',
    city: 'New York',
    state: 'NY',
    zipcode: '10021',
    location: { lat: 40.7737839, lng: -73.966075 }
  },
  {
    name: 'Union Square Dog Run',
    line_1: '15th St & Union Square W',
    city: 'New York',
    state: 'NY',
    zipcode: '10003',
    location: { lat: 40.7358984, lng: -73.9912281 }
  },
  {
    name: 'Robert Moses Dog Park',
    line_1: '1st Ave & E 42nd St',
    city: 'New York',
    state: 'NY',
    zipcode: '10017',
    location: { lat: 40.7488173, lng: -73.9696915 }
  },
  {
    name: 'Tompkins Square Dog Run NYC',
    line_1: '500 E 9th St',
    city: 'New York',
    state: 'NY',
    zipcode: '10009',
    location:  { lat: 40.7272618, lng: -73.9826618 }
  },
  {
    name: 'East River Park Esplanade',
    line_1: 'E River Bikeway',
    city: 'New York',
    state: 'NY',
    zipcode: '10016',
    location: { lat: 40.7099616, lng: -73.9898305 }
  },
  {
    name: 'North Chelsea Dog Park',
    line_1: '175 11th Ave',
    city: 'New York',
    state: 'NY',
    zipcode: '10011',
    location: { lat: 40.7486657, lng: -74.0071944 }
  },
  {
    name: 'Manhattan Beach Park Dog Run',
    line_1: '819 Oriental Blvd',
    city: 'New York',
    state: 'NY',
    zipcode: '11235',
    location: { lat: 40.5779472, lng: -73.9457408 }
  },
  {
    name: 'De Witt Clinton Dog Park',
    line_1: 'W 52nd St & 11th Ave',
    city: 'New York',
    state: 'NY',
    zipcode: '10019',
    location: { lat: 40.7671242, lng: -73.9937185 }
  },
  {
    name: 'St. Nicholas Dog Park',
    line_1: 'St Nicholas Ave & W 135th',
    city: 'New York',
    state: 'NY',
    zipcode: '10027',
    location: { lat: 40.817922, lng: -73.949734 }
  },
  {
    name: 'Leroy Street Dog Park',
    line_1: 'Leroy St & Pier 40',
    city: 'New York',
    state: 'NY',
    zipcode: '10014',
    location: { lat: 40.7294924, lng: -74.0114995 }
  },
  {
    name: 'Inwood Hill Park and Dog Run',
    line_1: 'W 215th St & Seaman Ave',
    city: 'New York',
    state: 'NY',
    zipcode: '10034',
    location: { lat: 40.8714786, lng: -73.9185691 }
  },
  {
    name: 'Marcus Garvey Dog Park',
    line_1: '18 Mt Morris Park W',
    city: 'New York',
    state: 'NY',
    zipcode: '10027',
    location: { lat: 40.8050093, lng: -73.9448633 }
  },
  {
    name: 'Fort Tryon Dog Run (Sir Williams Run)',
    line_1: '6672 Margaret Corbin Dr',
    city: 'New York',
    state: 'NY',
    zipcode: '10033',
    location: { lat: 40.8607169, lng: -73.9324757 }
  },
  {
    name: 'Chelsea Waterside Park and Dog Run',
    line_1: '11th Ave & W 22nd St',
    city: 'New York',
    state: 'NY',
    zipcode: '10011',
    location: { lat: 40.7481803, lng: -74.0074286 }
  },
  {
    name: 'Fish Bridge Dog Run',
    line_1: 'Dover St & Water St',
    city: 'New York',
    state: 'NY',
    zipcode: '10038',
    location: { lat: 40.7088079, lng: -74.0008619 }
  },
  {
    name: 'Peter Detmold Park and Dog Run',
    line_1: '454 E 51st St',
    city: 'New York',
    state: 'NY',
    zipcode: '10022',
    location: { lat: 40.753123, lng: -73.96409 }
  },
  {
    name: 'Cooper Dog Park',
    line_1: '104 Olive St',
    city: 'New York',
    state: 'NY',
    zipcode: '11211',
    location: { lat: 40.7160634, lng: -73.9390187 }
  },
  {
    name: 'Washington Square Dog Park',
    line_1: '5th Ave & Waverly Pl',
    city: 'New York',
    state: 'NY',
    zipcode: '10014',
    location: { lat: 40.7706426, lng: -73.0272999 }
  },
  {
    name: 'Morningside Park and Dog Run',
    line_1: '6 Morningside Dr',
    city: 'New York',
    state: 'NY',
    zipcode: '10025',
    location: { lat: 40.8021997, lng: -73.9609461 }
  },
  {
    name: 'Doughboy Plaza and Dog Run',
    line_1: 'Woodside Ave & 56th St',
    city: 'New York',
    state: 'NY',
    zipcode: '11377',
    location: { lat: 40.7461827, lng: -73.9081131 }
  },
  {
    name: 'Thomas Jefferson Dog Park',
    line_1: '2180 1st Ave',
    city: 'New York',
    state: 'NY',
    zipcode: '10029',
    location: { lat: 40.7937613, lng: -73.936671 }
  },
  {
    name: 'Theodore Roosevelt Park',
    line_1: '200 Central Park W',
    city: 'New York',
    state: 'NY',
    zipcode: '10024',
    location: { lat: 40.7812654, lng: -73.9738201 }
  },
  {
    name: 'J. Hood Wright Dog Park',
    line_1: '720 W 173rd St',
    city: 'New York',
    state: 'NY',
    zipcode: '10033',
    location: { lat: 40.8457587, lng: -73.9418144 }
  },
  {
    name: 'Ewen Park Dog Run',
    line_1: '3199 Riverdale Ave',
    city: 'New York',
    state: 'NY',
    zipcode: '10463',
    location: { lat: 40.8806454, lng: -73.9104023 }
  },
  {
    name: 'Coleman Square Playground and Dog Run',
    line_1: '45 Monroe St',
    city: 'New York',
    state: 'NY',
    zipcode: '10002',
    location: { lat: 40.7117368, lng: -73.9939988 }
  },
  {
    name: 'Highbridge Dog Park',
    line_1: 'Amsterdam Ave & Fort George Ave',
    city: 'New York',
    state: 'NY',
    zipcode: '10040',
    location:  { lat: 40.8564588, lng: -73.9248061 }
  },
  {
    name: 'Riverside Park Dog Runs',
    line_1: '224 W 72nd St',
    city: 'New York',
    state: 'NY',
    zipcode: '10023',
    location: { lat: 40.7789161, lng: -73.9830144 }
  },
  {
    name: 'Seton Dog Park',
    line_1: 'W 232nd St & Independence Ave',
    city: 'New York',
    state: 'NY',
    zipcode: '10463',
    location: { lat: 40.8849205, lng: -73.9163268 }
  },
  {
    name: 'TriBeCa Dog Run',
    line_1: 'Pier 26 & West St',
    city: 'New York',
    state: 'NY',
    zipcode: '10014',
    location: { lat: 40.7211627, lng: -74.0142773 }
  },
  {
    name: 'Bull Moose Dog Run',
    line_1: '1 W 81st St',
    city: 'New York',
    state: 'NY',
    zipcode: '10024',
    location: { lat: 40.7823822, lng: -73.9720258 }
  },
  {
    name: 'Battery Park',
    line_1: '17 State St',
    city: 'New York',
    state: 'NY',
    zipcode: '10024',
    location: { lat: 40.702795, lng: -74.01412 }
  },
];

async function geocode(park) {

  if (park.location === undefined){
    let location = park.line_1 + ' ' + park.city + ' ' + park.state;

    let tempResult;

    await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: location,
        key: 'AIzaSyCcL9Cp8Qdi3dT9U5Iimud0LcDowumqomY'
      }
    }).then(res => res.data.results.forEach(result => {
      let tempLocation = {
        lat: (Math.round(result.geometry.location.lat * 10000000) / 10000000),
        lng: (Math.round(result.geometry.location.lng * 10000000) / 10000000)};

        console.log(park.line_1, ' ', tempLocation)
        tempResult = tempLocation

      return tempLocation;
    })

  )
    .catch(err => console.log(err))
    return tempResult
  }
  else {
    return park.location
  }
}


function createParks(addresses) {

  let counter = 1;

  return Promise.all(
    addresses.map(async park => {

      let tempLocation = await geocode(park)

      let tempImageArr = []

      for (let i = 0; i < 5; i++){
        tempImageArr.push(`/images/ParkImages/dogPark_${counter % 770}.jpg`)
        counter++;
      }


      const address = await Address.create({
        line_1: park.line_1,
        city: park.city,
        state: park.state,
        zipcode: park.zipcode,
        location: tempLocation,
      });
      return Park.create({
        name: park.name,
        rating: 5,
        description: faker.lorem.paragraph(),
        imageUrls: tempImageArr,
        schedule: {},
        addressId: address.id,
      }).then(newPark => newPark);
    })
  );
}
// createParks(parks).then(data => console.log('this is it', data));

async function seed() {
  console.log('Syncing parks');
  return createParks(parks);
}

module.exports = seed;
