# Use official PHP 8.2 FPM image
FROM php:8.2-fpm

# Install system dependencies and PHP extensions needed by Laravel + Node.js build
RUN apt-get update && apt-get install -y \
    telnet \
    net-tools \
    iputils-ping \
    vim \
    curl \
    dnsutils \
    unzip \
    git \
    ca-certificates \
    libzip-dev \
    libicu-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql zip intl

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install Node.js v22
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && node -v && npm -v

# Set working directory inside container
WORKDIR /var/www/html

# Copy composer.json and composer.lock for caching
# Copy rest of the application code
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Copy package.json and package-lock.json for caching
COPY package*.json ./

# Install Node dependencies
RUN npm install



# Build front-end assets
RUN npm run build

# Set permissions (optional, adjust if needed)
RUN chown -R www-data:www-data /var/www/html

# Expose PHP-FPM port
EXPOSE 9000

# Start PHP-FPM server
CMD ["php-fpm"]
