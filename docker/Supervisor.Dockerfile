FROM guillaumehanotel/php:dev-8.2

ARG user
ARG uid

# Create user
RUN useradd -rm -d /home/$user -s /bin/bash -u $uid -g root -G www-data,root,sudo $user

RUN echo "$user ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

### Crontab
COPY scheduler /etc/cron.d/scheduler
RUN chmod 0644 /etc/cron.d/scheduler \
    && crontab /etc/cron.d/scheduler

# Copy Supervisor Conf
COPY supervisor /etc/supervisor

CMD supervisord -n -c /etc/supervisor/supervisord.conf
