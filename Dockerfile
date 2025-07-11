# Use Debian-based image for more flexibility
FROM php:8.2-fpm-bullseye

# Install system dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql mysqli exif gd xml mbstring opcache

# Set working directory
WORKDIR /var/www/html

# Copy local files into container
COPY . .

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/sites-available/default
RUN ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

# Expose port 8000 internally
EXPOSE 8000

# Start Nginx and PHP-FPM
CMD service nginx start && php-fpm8.2 -F