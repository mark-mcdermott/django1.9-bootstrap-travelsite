from django.contrib.auth.models import User
# from django.utils import six

from rest_framework import serializers

from api.models import (City, Hotel, Occupancy, Airline, Flight, 
    FlightInstance, Profile, Address, Payment, Transaction, Booking,
    Reservation, Feedback)


class CitySerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = '__all__'


class AirlineSerializer(serializers.ModelSerializer):

    class Meta:
        model = Airline
        fields = '__all__'


class HotelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Hotel
        fields = '__all__'
        # depth = 1


class OccupancySerializer(serializers.ModelSerializer):

    class Meta:
        model = Occupancy
        fields = '__all__'


class FlightSerializer(serializers.ModelSerializer):

    class Meta:
        model = Flight
        fields = '__all__'
        # depth = 1

    # http://www.django-rest-framework.org/api-guide/relations/


class FlightInstanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = FlightInstance
        fields = '__all__'
        # depth = 1


class AddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = '__all__'


class PaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Payment
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True)
    payment_methods = PaymentSerializer(many=True)

    class Meta:
        model = Profile
        fields = '__all__'

    def create(self, validated_data):
        addresses_data = validated_data.pop('addresses')
        payment_methods_data = validated_data.pop('payment_methods')

        profile = Profile.objects.create(**validated_data)

        for address_data in addresses_data:
            Address.objects.create(profile=profile, **address_data)

        for payment_method_data in payment_methods_data:
            Payment.objects.create(profile=profile, **payment_method_data)

        return profile

    def update(self, instance, validated_data):
        addresses_data = validated_data.pop('addresses')
        addresses = (instance.addresses).all()
        addresses = list(addresses)

        payment_methods_data = validated_data.pop('payment_methods')
        payment_methods = (instance.payment_methods).all()
        payment_methods = list(payment_methods)

        instance.mileage = validated_data.get('mileage', instance.mileage)
        instance.save()

        for address_data in addresses_data:

            if len(addresses) > 0:
                address = addresses.pop(0)
                address = Address.objects.select_for_update().filter(
                    id=address.id).update(**address_data)
            else:
                Address.objects.create(profile=instance, **address_data)

        for payment_data in payment_methods_data:

            if len(payment_methods) > 0:
                payment = payment_methods.pop(0)
                payment = Payment.objects.select_for_update().filter(
                    id=payment.id).update(**payment_data)
            else:
                Payment.objects.create(profile=instance, **payment_data)

        return instance


class BookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Booking
        fields = '__all__'


class ReservationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reservation
        fields = '__all__'


class TransactionSerializer(serializers.ModelSerializer):
    bookings = BookingSerializer(many=True)
    reservations = ReservationSerializer(many=True)

    class Meta:
        model = Transaction
        fields = '__all__'

    def create(self, validated_data):
        bookings_data = validated_data.pop('bookings')
        reservations_data = validated_data.pop('reservations')

        transaction = Transaction.objects.create(**validated_data)

        for booking_data in bookings_data:
            booking = Booking.objects.create(
                transaction=transaction, **booking_data)

        for reservation_data in reservations_data:
            Reservation.objects.create(
                transaction=transaction, **reservation_data)

        return transaction


class FeedbackSerializer(serializers.ModelSerializer):

    class Meta:
        model = Feedback
        fields = '__all__'
