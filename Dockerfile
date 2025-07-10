FROM php:8.2-fpm

# 1) Install system dependencies for PHP extensions
RUN apt-get update && apt-get install -y \
    git \
    curl \
    nginx \
    vim \
    nano \
    telnet \
    unzip \
    libicu-dev \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
  && rm -rf /var/lib/apt/lists/*

# 2) Configure GD with JPEG & FreeType
RUN docker-php-ext-configure gd \
      --with-freetype=/usr/include/ \
      --with-jpeg=/usr/include/

# 3) Install PHP extensions
RUN docker-php-ext-install \
      intl \
      zip \
      pdo_mysql \
      mbstring \
      exif \
      pcntl \
      bcmath \
      gd

# 4) Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 5) Configure Nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# 6) Copy app & set workdir
WORKDIR /var/www/html
COPY . .

# 7) Expose & start
EXPOSE 80
CMD service nginx start && php-fpm
