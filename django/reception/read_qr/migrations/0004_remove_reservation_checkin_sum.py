# Generated by Django 4.2.2 on 2023-06-07 15:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('read_qr', '0003_reservation_checkin_sum_alter_checkin_notes_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reservation',
            name='checkin_sum',
        ),
    ]