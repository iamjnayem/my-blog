# Use official PHP 8.2 FPM image as base
FROM php:8.2-fpm

# Install network tools + vim + other utilities + unzip + git (needed for composer)
RUN apt-get update && apt-get install -y \
    telnet \
    net-tools \
    iputils-ping \
    vim \
    curl \
    dnsutils \
    unzip \
    git \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory inside container
WORKDIR /var/www/html

# Copy your blog code into container (adjust source folder)
COPY . /var/www/html

# Set proper permissions (if needed)
RUN chown -R www-data:www-data /var/www/html

# Expose port 9000 for PHP-FPM
EXPOSE 9000

CMD ["php-fpm"]

