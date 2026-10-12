FROM node:22-alpine
ENV NODE_ENV=production PORT=8183 IMAGE_DIRECTORY=/opt/turots-iiif/images
WORKDIR /app
COPY server.mjs /app/server.mjs
USER 1000:1000
EXPOSE 8183
CMD ["node", "/app/server.mjs"]
