<?php

return [
    'proxies' => '*', // Trust all proxies (or use array of IPs)
    'headers' => \Illuminate\Http\Middleware\TrustProxies::HEADER_X_FORWARDED_ALL,
];