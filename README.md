# :hospital: MfCare

### Step to setup and run project
Note: All of the commands below need to run at the root of the project
<br/>
`*` Install docker and set assigned-memory for containers to 4Gb 
<br/>
`*` Download data.zip from this [link](https://drive.google.com/file/d/1pBIAb0K2Ee36gsQW3L8tJO-EpKBay5Hl/view?usp=sharing) and extract to the root folder of the project
<br/>
`*` Start docker daemon and run `docker-compose build`
<br/>
`*` Run command `sh bin/init.sh` to create, migrate and init data for database
<br/>
`*` Make sure port 3000, 4000 and 5000 are not being used by any processes
<br/>
`*` Run command `docker-compose up` to start server
<i>It will take 3-4 minutes for all services to start and get ready</i>
<br/>
`*` Finally navigate to [http://localhost:3000](http://localhost:3000) in your browser to explore the app
