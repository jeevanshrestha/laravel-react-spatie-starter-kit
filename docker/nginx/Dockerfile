#NGINX stage
FROM nginx 

#copy nginx configuration

COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./ssl/* /etc/nginx/ssl
RUN ls -la /etc/nginx/ssl
#Expose port 80 and 443

EXPOSE 80
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
