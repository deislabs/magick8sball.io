package main

type Reply struct {
	Tip         string `json:"tip"`
	Description string `json:"description"`
}

var Replies = []Reply{
	{"kubectl get cs", "Check the current status of the Kubernetes control-plane components."},
	{"kubectl explain", "List the fields for supported resources. Examples: kubectl explain pods, kubectl explain pods.spec.containers."},
	{"kubectl api-resources", "Print the supported API resources on the server."},
	{"kubectl get ev -w", "Watch all events in a given namespace."},
	{"kubectl logs –f", "Follow the logs for a specific container in a pod."},
	{"kubectl get po -o wide", "Print the list of pods in the current namespace with additional fields."},
	{"kubectl version","Print the current client and server Kubernetes version."},
	{"kubectl scale","Scale the number of replicas for the specified deployment."},
	{"kubectl run","Create and run a particular image, possibly replicated. Creates a deployment or job to manage the created container(s)."},
	{"🔥 this is fine 🔥", ""},
	{"kubectl port-forward","Forward one or more local ports to a pod."},
	{"kubectl exec -it POD COMMAND", "Execute a command in a container."},
	{"kubectl describe", "Show details of a specific resource or group of resources."},
	{"kubectl proxy", "Creates a proxy server or application-level gateway between localhost and the Kubernetes API Server. It also allows serving static content over specified HTTP path. All incoming data enters through one port and gets forwarded to the remote kubernetes API Server port, except for the path matching the static content path."},
	{"kubectl config view", "Display merged kubeconfig settings or a specified kubeconfig file."},
}
