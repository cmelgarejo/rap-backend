FROM strapi/base:14
# Set up working directory that will be used to copy files/directories below :
WORKDIR /app/rap-backend
# Copy package.json to root directory inside Docker container of Strapi app
COPY package.json .
# Install dependencies
RUN npm i
# == Copy required files ==
# In order to launch our Strapi app, we must import it into our image.
# We use the keyword ‘COPY’ to do that.
# The first parameter is the name of the file on the host.
# The second parameter is the path where to put the file on the image.
# ‘.’ or ‘/’ means the file will be put in the image root folder.
COPY favicon.png .
COPY favicon.ico .
COPY public/robots.txt public/
COPY extensions/ extensions/
COPY api/ api/
COPY config/ config/
# Generate a folder called ‘dist’.
# A ‘dist’ folder stands for distributable and refers to a directory where files will be stored that can be directly used by others without the need to compile or minify the source code that is being reused.
RUN npm run build
# Run on port 1337
EXPOSE 1337
# We need to define the command to launch when we are going to run the image.
# We use the keyword ‘CMD’ to do that.
# The following command will execute "npm start".
CMD ["npm", "start"]