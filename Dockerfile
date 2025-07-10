FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nginx \ 
    telnet \
    git \ 
    vim \ 
    nano

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configure Nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Set working directory
WORKDIR /var/www/html
COPY . .

# Expose ports
EXPOSE 80

# Start Nginx and PHP-FPM
CMD service nginx start && php-fpm
