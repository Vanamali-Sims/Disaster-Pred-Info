import React,{ useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  CreditCardIcon,
} from "@heroicons/react/24/solid";
 
export function Display() {
    const [type, setType] = useState("card");
    const [temp, setTemp] = useState('');
    const [hum, setHum] = useState('');

    const [formData, setFormData] = useState({
        zipCode : '',
        CountryCode : ''

    })

    const [locData, setLocData] = useState({
      lat : '',
      lon : ''

  })


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleData = (e) => {
      setLocData({ ...locData, [e.target.name]: e.target.value });
  };

    const handleLocdata = async (e) => {
      e.preventDefault();
      try{
          const response = await axios.post(`https://api.openweathermap.org/data/2.5/weather?lat=${locData.lat}&lon=${locData.lon}&appid=0675fb8dd46066212f37f0b90eed17ac`);
          console.log(response);
          setTemp(response?.data?.main?.temp);
          setHum(response?.data?.main?.humidity);
          localStorage.setItem('lat',locData.lat);
          localStorage.setItem('lon',locData.lon);
          
          
      } catch(error) {
        console.log(locData.lat);
        console.log(locData.lon);
          console.log(error);
      }
  }

    const handleReload = () => {
      window.location.reload();
      // Scroll to the middle of the section or page after reload
      window.scrollTo({
        top: document.body.scrollHeight / 2,
        behavior: 'smooth'
      });
    };
  

    const handleZipCode = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(`http://api.openweathermap.org/geo/1.0/zip?zip=${formData.zipCode},${formData.CountryCode}&appid=0675fb8dd46066212f37f0b90eed17ac`);

            const data = response.json();
            
            
        } catch(error) {
            console.log(locData.lon);
            console.log(error);
        }
    }


  return (
    <Card className="w-full max-w-[24rem] rounded-none">
      <CardHeader
        color="gray"
        floated={false}
        shadow={false}
        className="m-0 grid place-items-center px-4 py-8 text-center rounded-none"
      >
        <div className="mb-4 h-20 p-6 text-white">
          {type === "card" ? (
            <CreditCardIcon className="h-10 w-10 text-white" />
          ) : (
              <Typography variant="h5" className="italic" color="white">
              Zipcode
            </Typography>
          )}
        </div>
        {temp && hum ? (
          <>
            <Typography variant="h5" color="white">
              Explore the Locality
            </Typography>
            <Typography variant="small" color="white">
              Temperature is {temp}
            </Typography>
            <Typography variant="small" color="white">
              Humidity is {hum}
            </Typography>
          </>
        ) : (
          <Typography variant="h5" color="white">
          Explore the Locality
        </Typography>
        )}
      </CardHeader>

      <CardBody>
      <Tabs value={type} className="overflow-visible">
          <TabsHeader className="relative z-0 ">
            <Tab value="card" onClick={() => setType("card")}>
              Long and Lat
            </Tab>
            <Tab value="paypal" onClick={() => setType("paypal")}>
              Zip
            </Tab>
          </TabsHeader>
          <TabsBody
            className="!overflow-x-hidden !overflow-y-visible"
            animate={{
              initial: {
                x: type === "card" ? 400 : -400,
              },
              mount: {
                x: 0,
              },
              unmount: {
                x: type === "card" ? 400 : -400,
              },
            }}
          >
            <TabPanel value="card" className="p-0">
              <form className="mt-8 flex flex-col gap-4">
 
                <div className="my-3">
                  <div className="my-4 flex items-center gap-4">
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        Latitude
                      </Typography>
                      <Input
                        type="number"
                        name="lat"
                        onChange={handleData}
                        maxLength={4}
                        containerProps={{ className: "min-w-[72px]" }}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        Longitude
                      </Typography>
                      <Input
                        type="number"
                        maxLength={4}
                        name="lon"
                        onChange={handleData}
                        containerProps={{ className: "min-w-[72px]" }}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <Button size="lg" onClick={handleLocdata}>Get Data</Button>
                <Button size="lg" onClick={handleReload}>Mark the location</Button>
              </form>
            </TabPanel>
            <TabPanel value="paypal" className="p-0">
              <form className="mt-12 flex flex-col gap-4">
                <div className="my-6">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mt-4 -mb-2 font-medium"
                  >
                    Postal Code
                  </Typography>
                  <Input
                    placeholder="0000"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    containerProps={{ className: "mt-4" }}
                  />
                </div>
                <Button size="lg" onClick={handleZipCode}>Get Data</Button>
              </form>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </CardBody>
    </Card>
  );
}