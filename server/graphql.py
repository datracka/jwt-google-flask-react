import graphene
from flask import session

class Query(graphene.ObjectType):

    protected_request = graphene.String(argument=graphene.String(default_value="stranger"))

    def resolve_protected_request(self, info, argument):
        from server.models import validate_header
        validate_header(info)
        return 'Hello ' + argument


class SignOut(graphene.Mutation):
    ok = graphene.Boolean()
    
    def mutate(self, info):
        from server.models import delete, validate_header
        token = validate_header(info)
        delete(token)
        session.clear()
        return SignOut(True)

class Mutation(graphene.ObjectType):
    signOut = SignOut.Field()