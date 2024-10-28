FROM node:latest AS build
WORKDIR /app
RUN git clone http://github.com/AlfaIV/Dashboard.git
WORKDIR /app/Dashboard
RUN npm install
RUN npm run build --prod

FROM nginx:latest
COPY --from=build /app/Dashboard/dist/ros-atom/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]