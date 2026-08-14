import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ChevronDown, ChevronUp, FileSpreadsheet, FileText, Columns } from "lucide-react";
import { Card } from "@/components/erp/ui";

export const Route = createFileRoute("/admin/post-sales/loan-progress")({
  component: LoanProgressPage,
});

const associateOptions = [
  "Pramod koolwal SX 10003", "Aarif Khan SX 10010", "Aatmaram Jatwa SX 10177", "Abhay singh pal SX 10201",
  "Abhishek choudhary SX 10071", "Abhishek tiwari SX 10263", "Agarwal SX 10064", "Ajay maharwal SX 10062",
  "Ajay Sharma SX 10027", "AJEET SHERAWAT SX 10160", "Akash kumawat SX 10074", "Akhilesh Kumar SX 10271",
  "Akshay Kumawat 774644", "Alok kumar SX 10033", "Aman Deep Singh 803644", "Amar Singh SX 10124",
  "Amit Kumar sain SX 10218", "Amit saini SX 10242", "Amit Singh Shekhawat SX 10171", "Anay test SX 10085",
  "Anil Saini SX 10226", "Anita Verma SX 10056", "Ankit Test Wala SX 10013", "Anoop singh Rathore 852579",
  "Anshu varshney SX 10228", "Asha ghosh SX 10169", "Asha Jangir SX 10130", "Ashfap Khan 954963",
  "Ashish Kumar sain SX 10059", "Ashok Jangid SX 10122", "Ashok Kumar Choudhary 623746", "ASHOK KUMAR GOUR SX 10146",
  "Ashok Kumar Meena SX 10173", "Ashok kumar SX 10042", "Avinash tank SX 10098", "Babita Bagariya SX 10119",
  "Babita jain SX 10235", "Babita Jangir 629325", "Babita Saini SX 10189", "Badri Narayan saini SX 10144",
  "Badshah kureshi SX 10047", "Ballu kureshi SX 10154", "Balveer singh SX 10006", "BANSHI LAL SX 10181",
  "Bansidhar saini SX 10205", "Beena Sharma SX 10011", "Bhagirath singh Rathore SX 10036", "Bharti devi SX 10243",
  "bhawani singh meena SX10001", "Bhuneshwar Gupta SX 10224", "Bhupender Singh SX 10197", "bijander singh SX 10239",
  "CHANDA DEVI SX 10203", "Chandra Prakash Kumawat SX 10259", "Chandra Prakash Meena SX 10133", "Chandra Shekhar Chaturvedi SX 10038",
  "Chhitar mal yadav SX 10107", "Daulat singh SX 10035", "Deendayal Sahu SX 10030", "Dharmendra Kumar Budania SX 10236",
  "Dharmendra Kumar Raiger SX 10255", "Digvijay Singh Katoch SX 10150", "Dilip singh shekhawat SX 10061", "DINESH KUMAR VASHISTH 217233",
  "Divya Kumawat 835366", "Er Sunil kumar SX 10116", "Faruk Husain SX 10004", "Ganesh kumawat SX 10136",
  "Geeta Sharma SX 10212", "Ghanshyam Laxkar 519145", "Gjgh SX 10088", "Gjjh SX 10089", "Gokul singh SX 10208",
  "Goopal singh nimesh SX 10068", "Gopal Sharma SX 10264", "Gopal singh tanwar SX 10163", "Govind Sharma SX 10184",
  "Govind Singh Shekhawat SX 10178", "Guddi Yadav 616519", "Gulab chand sharma SX 10261", "Gulab hussan SX 10031",
  "Hanuman choudhary SX 10132", "hanuman jii 143047", "Hari Charan singh Chauhan SX 10252", "Harish kumar patel SX 10210",
  "Harish kumawat 665492", "Harsh Vardhan Singh SX 10166", "Harvindra Singh 938391", "Hemlata Kanwar 731014",
  "Hemraj choudhary SX 10041", "Hukam Singh Gour Rajput SX 10188", "Ishwar Narayan bunkar SX 10204", "Jagannath Raigar SX 10248",
  "Jagmohan tanwar SX 10206", "JAI SINGH RAJAWAT SX 10174", "Jaiprakash saini SX 10202", "Jayanta Dey SX 10052",
  "Jitendra Kumar saini SX 10139", "Jitendra Tulsani SX 10258", "KALU RAM SHARMA SX 10045", "Kamal Singh chaudhary SX 10149",
  "Kamlesh Kumar kansotiya SX 10110", "Kanaram Sharma SX 10039", "Kanhaiya Lal Nayak SX 10080", "KAVITA MOHANPURIA SX 10266",
  "Keshar dev jangid SX 10140", "Khemraj swami SX 10127", "Kirori mal sharma SX 10156", "Krishan Kumar SX 10129",
  "Krishan kumar SX 10152", "Krishna Sain SX 10219", "Kriti Chandwani SX 10227", "Kriti panwar SX 10198",
  "Kundan.sing. SX 10024", "Kusum Kumawat SX 10072", "Lakhan Singh Jadon SX 10253", "Lakshit pant SX 10104",
  "Lal singh jadoun 722997", "Laxmikant sharma SX 10244", "Lekhraj kumawat 028879", "Lokendra sigh gurjar SX 10262",
  "Lokesh Prajapat SX 10191", "Madan Lal Jat 358017", "Madan lal Jat SX 10019", "Mahaveer Singh Rajawat SX 10193",
  "Mahendra Kumar saini 370921", "Mahendra kumar sharma SX 10096", "Mahendra Kumar SX 10065", "Mahendra Singh SX 10126",
  "Mahendra Singh Naruka SX 10112", "Mahesh Bhattacharya SX 10040", "Mahesh chand SX 10114", "Mahesh Kumar Bhatachariye SX 10158",
  "Mahesh Kumar Sharma SX 10200", "MANISH KUMAR GUPTA SX 10267", "Manju kumawat 373316", "MANOJ JAIN SX 10090",
  "Manoj kumar sharma SX 10141", "Manoj Kumar SX 10137", "Manoj sisodiya SX 10066", "Matadeen Singh Shekhawat SX 10128",
  "Maya Sharma SX 10020", "MAYANK RAI SX 10125", "Mehnuddin khan 420959", "MEHROFAR KHAN 370520",
  "Mohammad Azad SX 10028", "Mohammad ismail SX 10034", "Mohammad Salim Ahmad SX 10078", "Mohammed Samad Khan 624721",
  "Mohan lal jat 383822", "Mohan Lal Meena SX 10091", "MOHIT SHARMA SX10196", "Mohit SX 10131",
  "MOIN UDDIN 290097", "Monika shegal SX 10113", "Mukesh Kumar SX 10175", "Mukesh kumar agraval SX 10251",
  "Mukesh kumar SX 10220", "MUKESH SINGH RATHORE 936788", "Mukesh Tyagi SX 10172", "Nand kishor SX 10076",
  "naveen gupta SX 10214", "Navratan Chayal SX 10147", "Neeraja chauhan SX 10186", "Nemee chand khichar SX 10077",
  "Nishi Kant Ghosh SX 10170", "Nitesh Sharma SX 10222", "OM PRAKASH SAINI SX 10022", "Om prakash sharma SX 10165",
  "Om saini SX 10053", "Omender singh Nathawat SX 10265", "Pooja Sharma SX 10151", "Prabhu rajoriya SX 10032",
  "Prabhusingh chouhan SX 10069", "Prakash chandra regar SX 10164", "Pranav chauhan SX 10108", "Prithvi singh Kachhawa SX 10225",
  "Priya Chaudhary SX 10157", "Priya kanwar SX 10121", "Puja kanwar SX 10213", "PUNEET SAXENA SX 10092",
  "Rabban 978966", "RAGHAVENDRA SINGH CHOUDHARY 070218", "Raghuraj Singh SX 10270", "Raj choudhary SX 10050",
  "RAJ VERMA SX 10060", "Rajat Bunker SX 10073", "Rajendra kumar kuldeep SX 10018", "Rajendra Singh SX 10256",
  "Rajesh Agarwal 447390", "Rajesh kumar harashwal SX 10123", "Rajesh Meena SX 10155", "Rajhes sharma SX 10025",
  "Rajveer Singh SX 10057", "Rajveer Saini SX 10105", "Rakesh kumar jhajoter SX 10079", "Rakesh saini SX 10269",
  "Ram Niwas Raiger SX 10021", "Ram swami SX 10115", "Ramakant Sharma SX 10238", "Rambabu Prajapat SX 10190",
  "Ramesh Chand Phanda SX 10106", "Ramesh chand Sharma SX 10268", "Ramesh kumar sharma SX 10063", "Ramesh Saxena 925095",
  "Rameshwar singh SX 10161", "RAMJI LAL LAKHERA SX 10199", "Ramniwas Mehra SX 10234", "Ramvatar yogi SX 10260",
  "Ratani Devi SX 10009", "Ravindra singh shekhawat 236834", "Rekha SX 10195", "Rewat singh rathore SX 10237",
  "Rinki chouhan SX 10101", "Roopendra Pal Singh SX 10223", "Roopnarayan khunteta SX 10246", "Sachin sharma SX 10037",
  "Safi SX 10273", "SAKSHI GIRDHANI SX10002", "Sandeep choudhary SX 10134", "Sanjay kumar Bunkar SX 10055",
  "SANJAY SWAMI SX 10145", "Santosh Mandal SX 10168", "Sardarmal chodary SX 10245", "Satender Singh SX 10232",
  "Satya SX 10135", "Satyanarayan SX 10240", "Sayar Singh Gurjar SX 10182", "Saziya khan SX 10007",
  "Seema Sharma 685878", "Seema SX 10111", "Shabnam saudagar 971122", "Shafi munir 658211",
  "Shahid khan SX 10026", "Shailendra Singhal SX 10138", "SHAKUNTALA 545612", "Shalini Rao SX 10046",
  "Sheela gupta SX 10229", "Shikhar Vardhan Singh SX 10209", "shiv sankar 335265", "Shivani dotaniya SX 10167",
  "shree ram ji 780885", "shri ganesh 744343", "shri jagdish jii 151307", "SHRI KRISHNA JII 408918",
  "Sitaram Meena SX 10176", "Smt Geeta Devi SX 10192", "Sourabh Gupta SX 10180", "SUDHIR GOGIA SX 10023",
  "Sudhir Yadav 662510", "Suman Kumawat SX 10015", "Suman SX 10120", "Sumita Sharma SX 10142",
  "SUMITA SHARMA SX 10211", "SUNIL Kumar SX 10162", "Sunil kumar Jatawat SX 10103", "Sunil kumar saini SX 10241",
  "Sunil Kumkum SX 10117", "Sunita SX 10095", "sunita sharma SX 10272", "SURENDRA SINGH RAJAWAT 868211",
  "Suresh kumar kudia SX 10093", "Suresh Kumar Mandal SX 10005", "Suresh kumar SX 10143", "Suresh Kumar Verma SX 10221",
  "surya singh 583813", "SURYAX PRIVATE LIMITED 123456", "Tanisha Dixit SX 10008", "Taniya goplani SX 10183",
  "TANWAR SINGH HADA SX 10054", "Tapan Sharma SX 10048", "TejkarN choudhary SX 10075", "TEJPAL SINGH SX 10216",
  "Tejpal Yadav SX 10051", "test associate SX 10081", "Tester 2 SX 10087", "Twist 2 SX 10083",
  "Umashankar saini SX 10187", "UMESH KUMAR CHAUMAL SX 10067", "Umesh parshad sharma SX 10233", "Usha Pareek SX 10215",
  "Vaibhav Test Test 1 SX10148", "Vijay Bhan Sharma SX 10097", "Vijay Laxmi SX 10094", "vijay raj soni SX 10254",
  "Vijay Shankar Jaiswal SX 10109", "Vijay singh SX 10185", "vijay SX 10231", "Vikram Singh 045529",
  "Vikram Singh Shekhawat SX 10230", "vimlesh devi 644926", "Vinod jangid SX 10249", "Vinod jangid SX 10058",
  "Vinod kumar sain SX 10217", "Vipul Singh SX 10159", "Virendra nishad SX 10029", "Vishal choudhary SX 10118",
  "Vishnu Khandelwal SX 10153", "Vishnu Kumar SX 10250", "vishnukumarsaini SX 10194", "YASHOVARDHAN SINGH GAUR SX 10179",
  "Yogesh kumawat SX 10070", "Yogesh Sharma SX 10014", "Yogesh sharma SX 10257"
];

const loanData = [
  {
    id: 1,
    bookingDate: "02-07-2026",
    unitType: "PLOT",
    project: "SURYAX INDUSTRIAL PARK",
    unitDetail: "A18",
    unitSize: "A259.72",
    associateName: "Vaibhav Test Test 1",
    contactNo: "7587976545",
    customerName: "Mukesh Lead",
    custContact: "+917415540909",
    paymentPlan: "",
    totalAmount: "20,00,000.00",
    guidelineValue: "0.00",
    guidelineReceived: "0.00",
    guidelineDue: "0.00",
    otherValue: "20,00,000.00",
    otherReceived: "0.00",
    otherDue: "20,00,000.00",
    receivedAmt: "0.00",
    dueAmt: "20,00,000.00",
    remark: ""
  },
  {
    id: 2,
    bookingDate: "24-04-2026",
    unitType: "PLOT",
    project: "SURYAX INDUSTRIAL PARK",
    unitDetail: "A11",
    unitSize: "1889.26",
    associateName: "SURYAX PRIVATE LIMITED",
    contactNo: "9660033516",
    customerName: "NAMIT SHARMA",
    custContact: "+918239982399",
    paymentPlan: "",
    totalAmount: "19,60,000.00",
    guidelineValue: "0.00",
    guidelineReceived: "0.00",
    guidelineDue: "0.00",
    otherValue: "19,60,000.00",
    otherReceived: "0.00",
    otherDue: "19,60,000.00",
    receivedAmt: "0.00",
    dueAmt: "19,60,000.00",
    remark: ""
  }
];

function LoanProgressPage() {
  const [searchOpen, setSearchOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#f8f9fb] space-y-4">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2  py-3 bg-white border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800">Booking Wise Amount (Payment)</h1>
        <p className="text-sm text-gray-500">Home Page / Booking Wise Amount (Payment)</p>
      </div>

      <div className="py-3  space-y-4">
        {/* ===================== SEARCH PANEL ===================== */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                <Search className="size-4" /> Search Panel
            </div>
            {searchOpen ? <ChevronUp className="size-4 text-gray-500" /> : <ChevronDown className="size-4 text-gray-500" />}
          </button>

          {searchOpen && (
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
                <div><label className="text-xs font-semibold text-gray-700 block mb-1">From Date</label><input type="date" className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#6732F2]" /></div>
                <div><label className="text-xs font-semibold text-gray-700 block mb-1">To Date</label><input type="date" className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#6732F2]" /></div>
                <div><label className="text-xs font-semibold text-gray-700 block mb-1">Unit Type</label>
                    <select className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#6732F2]">
                        <option>Select Unit Type</option><option>APARTMENT</option><option>PLOT</option><option>ROWHOUSE</option><option>MEMBER</option><option>COMMERCIAL</option>
                    </select>
                </div>
                <div><label className="text-xs font-semibold text-gray-700 block mb-1">Project</label><select className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#6732F2]"><option>Select Project</option></select></div>
                <div><label className="text-xs font-semibold text-gray-700 block mb-1">Unit No.</label><select className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#6732F2]"><option>Select Unit</option></select></div>
                <div><label className="text-xs font-semibold text-gray-700 block mb-1">Associate Name</label>
                    <select className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#6732F2]">
                        <option>Select</option>
                        {associateOptions.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                </div>
              </div>
              <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
                <button className="h-9 px-6 bg-[#6732F2] text-white text-sm font-medium rounded hover:bg-[#5a2ad6] transition-colors flex items-center gap-2">
                    <Search className="size-4" /> Search
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ===================== LIST SECTION ===================== */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-800">List</h2>
            <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"><FileSpreadsheet className="size-3.5" /> Excel</button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"><FileText className="size-3.5" /> PDF</button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"><Columns className="size-3.5" /> Column <ChevronDown className="size-3" /></button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              Show
              <select className="border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-[#6732F2]">
                <option>10</option><option>25</option><option>50</option><option>100</option><option>200</option><option>400</option><option>All</option>
              </select>
              entries
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">Search: <input type="text" className="border border-gray-300 rounded px-2.5 py-1.5 text-xs w-40 focus:ring-1 focus:ring-[#6732F2]" /></div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[10.5px] text-left min-w-[2400px]">
              <thead>
                <tr className="bg-[#6732F2] text-white">
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">Action</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">Booking Date</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">Unit Type</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">Project</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">Unit Detail</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">Unit Size</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">Associate Name</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">Contact No</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">Customer Name</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">Contact No</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">Payment Plan</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">Total Amount</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">Guideline Value</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">Guideline Received</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">Guideline Due</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">Other Value</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">Other Received</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">Other Due</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">Received Amt.</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">Due Amt.</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">Remark</th>
                </tr>
              </thead>
              <tbody>
                {loanData.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}>
                    <td className="px-3 py-2.5"></td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{row.bookingDate}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{row.unitType}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{row.project}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{row.unitDetail}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{row.unitSize}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{row.associateName}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{row.contactNo}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{row.customerName}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{row.custContact}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{row.paymentPlan}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">₹{row.totalAmount}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">₹{row.guidelineValue}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">₹{row.guidelineReceived}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">₹{row.guidelineDue}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">₹{row.otherValue}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">₹{row.otherReceived}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">₹{row.otherDue}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">₹{row.receivedAmt}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap text-red-600 font-medium">₹{row.dueAmt}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{row.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
