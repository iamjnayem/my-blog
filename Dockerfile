# Use official PHP 8.2 FPM image as base
FROM php:8.2-fpm

# Install network tools + vim + other utilities
RUN apt-get update && apt-get install -y \
    telnet \
    net-tools \
    iputils-ping \
    vim \
    curl \
    dnsutils \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory inside container
WORKDIR /var/www/html

# Copy your blog code into container (adjust source folder)
COPY . /var/www/html

# Set proper permissions (if needed)
RUN chown -R www-data:www-data /var/www/html

# Expose port 9000 for PHP-FPM
EXPOSE 9000

CMD ["php-fpm"]
